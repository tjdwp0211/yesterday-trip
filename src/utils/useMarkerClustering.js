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

// // K-Means 클러스터링을 위한 함수
// function kMeansClustering(data, numClusters) {
//   // 초기 중심점 생성 (랜덤하게 선택하거나 수동으로 선택 가능)
//   let centroids = data.slice(0, numClusters).map((obj) => ({
//     contentId: obj.contentId,
//     contentTypeId: obj.contentTypeId,
//     sidoCode: obj.sidoCode,
//     gugunCode: obj.gugunCode,
//     title: obj.title,
//     address: obj.address,
//     tel: obj.tel,
//     zipcode: obj.zipcode,
//     imageUrl: obj.imageUrl,
//     latitude: obj.latitude,
//     longitude: obj.longitude,
//     mlevel: obj.mlevel,
//     avgScore: obj.avgScore
//   }));

//   // 클러스터링 반복 횟수 설정
//   const maxIterations = 100;

//   for (let iteration = 0; iteration < maxIterations; iteration++) {
//     // 데이터 포인트를 가장 가까운 중심점에 할당하여 클러스터 생성
//     const clusters = new Array(numClusters).fill().map(() => []);

//     data.forEach((point) => {
//       let minDistance = Infinity;
//       let clusterIndex = 0;

//       centroids.forEach((centroid, index) => {
//         const distance = Math.sqrt(
//           (point.latitude - centroid.latitude) ** 2 + (point.longitude - centroid.longitude) ** 2
//         );
//         if (distance < minDistance) {
//           minDistance = distance;
//           clusterIndex = index;
//         }
//       });

//       clusters[clusterIndex].push(point);
//     });

//     // 이전 중심점 저장
//     const previousCentroids = [...centroids];

//     // // 새로운 중심점 계산
//     // centroids = clusters.map((cluster) => {
//     //   const clusterSize = cluster.length;
//     //   const clusterSum = cluster.reduce(
//     //     (acc, val) => {
//     //       return { latitude: acc.latitude + val.latitude, y: acc.y + val.longitude };
//     //     },
//     //     { x: 0, y: 0 }
//     //   );

//     //   return {
//     //     x: clusterSum.x / clusterSize,
//     //     y: clusterSum.y / clusterSize
//     //   };
//     // });

//     // 중심점 업데이트 후 변화가 없으면 종료
//     // if (JSON.stringify(previousCentroids) === JSON.stringify(centroids)) {
//     //   break;
//     // }
//   }

//   return centroids;
// }

// export function useMarkerClustering(data, groupNum) {
//   // 클러스터링 실행
//   const result = kMeansClustering(data, groupNum);

//   // 결과 출력
//   console.log(`주어진 데이터를 ${groupNum}개의 군집으로 나눈 결과:`);
//   console.log("result :", result);
//   result.forEach((centroid, index) => {
//     console.log("centroid :", centroid);
//     console.log(`군집 ${index + 1}: 위도 ${centroid.latitude}, 경도 ${centroid.longitude}`);
//   });
// }

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
export function useMarkerClustering(data, groupNum) {
  // 클러스터링 실행
  const result = kMediansClustering(data, groupNum);

  // 결과 출력

  console.log(`주어진 데이터를 ${groupNum}개의 군집으로 나눈 결과:`);
  console.log("result :", result);
  result.forEach((centroid, index) => {
    console.log(`군집 ${index + 1}: 위도 ${centroid.center.latitude}, 경도 ${centroid.center.longitude}`);
  });
}
