// let centroids = data.slice(0, numClusters).map((obj) => ({
//   contentId: obj.contentId,
//   contentTypeId: obj.contentTypeId,
//   sidoCode: obj.sidoCode,
//   gugunCode: obj.gugunCode,
//   title: obj.title,
//   address: obj.address,
//   tel: obj.tel,
//   zipcode: obj.zipcode,
//   imageUrl: obj.imageUrl,
//   latitude: obj.latitude,
//   longitude: obj.longitude,
//   mlevel: obj.mlevel,
//   avgScore: obj.avgScore
// }));

// 두 점 사이의 거리 계산 함수
function distance(pointA, pointB) {
  return Math.abs(pointA.latitude - pointB.latitude) + Math.abs(pointA.longitude - pointB.longitude);
}

// 중앙값 찾기 함수 (새로 계산하지 않음)
function findMedian(points) {
  const sortedByLat = points.map((p) => p.latitude).sort((a, b) => a - b);
  const sortedByLong = points.map((p) => p.longitude).sort((a, b) => a - b);

  const medianIndex = Math.floor(sortedByLat.length / 2);

  return {
    latitude: sortedByLat[medianIndex],
    longitude: sortedByLong[medianIndex]
  };
}

// K-Medians 클러스터링 함수
function kMediansClustering(data, numClusters) {
  // 초기 중앙값 설정
  let centroids = data.slice(0, numClusters);

  // 클러스터링 반복 횟수 설정
  const maxIterations = 100;

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // 데이터 포인트를 가장 가까운 중앙값에 할당하여 클러스터 생성
    const clusters = new Array(numClusters).fill().map(() => []);

    data.forEach((point) => {
      let minDistance = Infinity;
      let clusterIndex = 0;

      centroids.forEach((centroid, index) => {
        const dist = distance(point, centroid);
        if (dist < minDistance) {
          minDistance = dist;
          clusterIndex = index;
        }
      });

      clusters[clusterIndex].push(point);
    });

    // 중앙값 업데이트 없이 종료
    // (K-Medians에서는 중앙값을 다시 계산하지 않음)

    const result = clusters.map((cluster, i) => ({ center: centroids[i], groupSize: cluster.length }));

    return result;
  }
}

function kMediansClusteringByUserClick(data, numClusters, userClickedContentId) {
  // 초기 중앙값 설정
  let centroids = data.slice(0, numClusters);

  // 클러스터링 반복 횟수 설정
  const maxIterations = 100;

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // 데이터 포인트를 가장 가까운 중앙값에 할당하여 클러스터 생성
    const clusters = new Array(numClusters).fill().map(() => []);

    data.forEach((point) => {
      if (point.contentId === userClickedContentId) {
        let minDistance = Infinity;
        let clusterIndex = userClickedContentId;

        centroids.forEach((centroid, index) => {
          const dist = distance(point, centroid);
          if (dist < minDistance) {
            minDistance = dist;
            clusterIndex = centroid.contentId;
          }
        });

        clusters[clusterIndex].push(point);
      }
    });

    // 중앙값 업데이트 없이 종료
    // (K-Medians에서는 중앙값을 다시 계산하지 않음)

    const result = clusters.map((cluster, i) => ({ center: centroids[i], groupSize: cluster.length }));

    return result;
  }
}

export function useMarkerClustering(data, groupNum, userClickedContentId) {
  // 클러스터링 실행
  console.log(`IN CLUSTER :`, data, groupNum, userClickedContentId);
  if (userClickedContentId) {
    const clusteredList = kMediansClusteringByUserClick(data, groupNum, userClickedContentId);
    return clusteredList;
  } else {
    const clusteredList = kMediansClustering(data, groupNum);
    return clusteredList;
  }
}
