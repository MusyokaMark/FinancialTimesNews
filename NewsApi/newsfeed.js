const token = `5NhggTAvnP9MqPJt9rwH5QQwPkbGbmQhSCatL5VG`
const API_ENDPOINT =
  `https://api.marketaux.com/v1/news/all?symbols=TSLA%2CAMZN%2CMSFT&filter_entities=true&language=en&api_token=${token}`;

async function getNewsFeed() {
  try {
    let r = await fetch('testJson.json');
    let allNews = await r.json();
    // for (var i = 0; i < 3; i++) {
    //   // const response = await fetch(`${API_ENDPOINT}&page=${i}`);
    //   if (!response.ok) {
    //     throw new Error(`Error ${response.status}: ${response.statusText}`);
    //   }
    //   const news = await response.json();
    //   allNews.push(...news.data);
    // }
    console.log(allNews);

    let newsHTML = '';
    for (let index = 0; index < 5; index++) {
      const item = allNews[index];
      newsHTML = newsHTML + `
      <div class="card">
                <div class="news-item">
                  <img src="${item.image_url}" alt="${item.title}">
                  <h2>${item.title}</h2>
                  <p>${item.description}</p>
                  <a href="${item.url}" target="_blank">Read more</a>
                </div>
                </div>
              `;
    }
    document.getElementById("news").innerHTML = newsHTML;

  } catch (error) {
    console.error(error);
  }
}
async function main() {
  await getNewsFeed();
}

main();
