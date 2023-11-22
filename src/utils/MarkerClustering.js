function euclideanDistance(point1, point2) {
  // 유클리드 거리 계산 함수            point.latitude, point.longitude
  console.log(`point1 :`, point1.latitude, point1.longitude);
  console.log(`point2 :`, point2);
  const latDiff = point1.latitude - point2.latitude;
  const lonDiff = point1.longitude - point2.longitude;
  return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
}

function kMeans(attractionObjectList, k, maxIterations = 100) {
  // 초기 중심점 선택
  let randomCenterBaskets = [];
  for (let i = 0; i < k; i++) {
    randomCenterBaskets.push(attractionObjectList[Math.floor(Math.random() * attractionObjectList.length)]);
  }
  //   console.log(`randomCenterBaskets :`, randomCenterBaskets);

  let iterations = 0;
  let prevCenterBasket = [];
  let clusters = [];
  while (iterations < maxIterations && JSON.stringify(randomCenterBaskets) !== JSON.stringify(prevCenterBasket)) {
    clusters = Array.from({ length: k }, () => []);

    // 데이터를 가장 가까운 중심점에 할당
    for (const point of attractionObjectList) {
      const distances = randomCenterBaskets.map((center) => {
        // console.log(`center :`, center);
        return euclideanDistance(point, center);
      });
      //   console.log(`distances :`, distances);
      const closestCentroid = distances.indexOf(Math.min(...distances));
      clusters[closestCentroid].push(point);
    }

    // 이전 중심점 저장 후 새로운 중심점 계산
    prevCenterBasket = [...randomCenterBaskets];
    randomCenterBaskets = clusters.map((cluster) => {
      const clusterDimensionSums = cluster.reduce((acc, point) => {
        return acc.map((dim, i) => dim + point[i]);
      }, new Array(attractionObjectList[0]?.length).fill(0));
      return clusterDimensionSums.map((sum) => sum / cluster.length);
    });

    iterations++;
  }

  return clusters;
}

// 군집 수와 데이터를 넣고 군집화 수행
export function useMarkerClustering(attractionObjectList, groupNum) {
  const result = kMeans(
    attractionObjectList.map((attraction) => attraction),
    groupNum
  );

  // 결과 출력
  console.log(result);
}
