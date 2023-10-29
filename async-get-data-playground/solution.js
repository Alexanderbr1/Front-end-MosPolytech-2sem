

// Решение

const { getHashByData, fetchData } = require("./utils");
 
function calcHashSum(data) {
  return new Promise((resolve, reject) => {
    getHashByData(data, (hash) => resolve(hash));
  });
}
 
module.exports = async function (urls, retryCount) {
  const result = [];
 
  async function getData(url, localRetryCount) {
    for (let i = 0; i <= localRetryCount; i++) {
      try {
        const { data, hashSum } = await fetchData(url);
        const calculatedHash = await calcHashSum(data);
        if (calculatedHash === hashSum) {
          return data;
        } else {
          throw new Error("Неверная хэш-сумма");
        }
      } catch (error) {
      }
    }
  }
 
  const fetchPromises = urls.map((url) => getData(url, retryCount));
  const fetchResults = await Promise.allSettled(fetchPromises);
 
  for (let i = 0; i < fetchResults.length; i++) {
    const fetchResult = fetchResults[i];
    if (fetchResult.status === "fulfilled") {
      if (fetchResult.value) {
        result.push(fetchResult.value);
      }
    }
  }
}