const axios = require("axios");
const cheerio = require("cheerio");
let index = 36;

const mysql = require('mysql');
const db = mysql.createPool({
  host: "211.47.75.102",
  user: "qkrtmfqls",
  password: "awdawd15963",
  database: "dbqkrtmfqls"
});


// const db = mysql.createPool({
//   host: "my8001.gabiadb.com",
//   user: "vipadmin",
//   password: "awdawd15963",
//   database: "vipdb"
// });

// axios를 활용해 AJAX로 HTML 문서를 가져오는 함수 구현
async function getHTML(i) {
  try {
    return await axios.get("https://haemukja.com/recipes/" + i);
  } catch (error) {
    console.error(error);
  }
}


// 동기를 다 끝내고 비동기로 해버리는건지
// 위에 동기가 있어도 밑에 비동기가 있으면
// 밑에 비동기가 먼저 실행이 될수도 있나?

const a = () => {
  getHTML(index)
    .then(html => {
      const $ = cheerio.load(html.data);

      //foodid 는 인덱스로
      //재료 이름 , 개수 끝
      const igdn = []; //재료이름
      const igdc = []; //재료개수
      $('ul.lst_ingrd li').each((i, el) => {
        igdn[i] = $(el).find('span').text()
        igdc[i] = $(el).find('em').text()
      });

      //인서트 성공 후에 update 문
      //const UFoodigd = "UPDATE FoodIgd SET IgdN"+(i+1)+"=(?),Igdc"+(i+1)+"=(?) where FoodId = (?);"; //계산값 퇴근표시 
      //"INSERT INTO login (id, pwd,job,nickname) VALUES (?,?,?,?)";
      // console.log('재료이름 : ', igdn)
      // console.log('재료개수 : ', igdc)



      //요리 제목 끝 
      //FoodMain
      let foodn = [] //요리제목
      $('div.top h1 strong').each((i, el) => {
        foodn = $(el).text();
        //console.log('i = '+i+$(el).text());
      });
      //console.log('요리 제목 : ', foodn);


      // 조리시간 , 칼로리 끝
      //FoodMain
      let foodt; //조리시간
      let foodc = ''; //칼로리 
      $('dl.info_basic dd').each((i, el) => {
        if (i == 0)
          foodt = $(el).text()
        if (i == 2)
          foodc = $(el).text()
      });
      //console.log('조리시간 :  ', foodt)
      //console.log('칼로리  :  ', foodc)




      // 레시피 설명 끝
      const rcpt = []; //레시피 설명 0
      $('ol.lst_step p').each((i, el) => {
        if ($(el).text() != '')
          rcpt[i] = $(el).text();
      });
      //console.log('레시피 설명 : ', rcpt)
      //이미지 소스 끝
      const rcpi = []; //레시피이미지 10
      $('ol.lst_step img').each((i, el) => {
        rcpi[i] = $(el).attr('src');
      });
      //console.log('이미지 소스 : ', rcpi)




      // 첫번째 인서트

      const erraa = "INSERT INTO err (id) VALUES (?)";
      const FoodMain = "INSERT INTO FoodMain(FoodId, FoodN, FoodV, FoodT, FoodC) VALUES(?, ?, ?, ?, ?)";
      const Foodigd = "INSERT INTO FoodIgd (FoodId, IgdN1, IgdC1) VALUES (?,?,?)";
      const Recipe = "INSERT INTO Recipe (FoodId, RcpI1, RcpT1) VALUES (?,?,?)";

      db.query(FoodMain, [index, foodn, rcpi[0], foodt, foodc], (err, res) => {
        if (err) {
          db.query(erraa, [index], (err, result) => {
            if (err) console.log(err);
          });
        }
          db.query(Foodigd, [index, igdn[0], igdc[0]], (err, result) => {
            if (err) {
              db.query(erraa, [index], (err, result) => {
                if (err) console.log(err)
              });
            }
              db.query(Recipe, [index, rcpt[0], rcpi[0]], (err, result) => {
                if (err) {
                  db.query(erraa, [index], (err, result) => {
                    if (err) console.log(err);
                  });
                }
                  igdn.map((arr, i) => {
                    console.log(i);
                    const UFoodigd = "UPDATE FoodIgd SET IgdN" + (i + 1) + "=(?),IgdC" + (i + 1) + "=(?) where FoodId = (?);"; //계산값 퇴근표시 
                    console.log(UFoodigd);
                    if (i > 0 && i < 15) {
                      db.query(UFoodigd, [igdn[i], igdc[i], index], (err, res) => {
                        if (err) {
                          db.query(erraa, [index], (err, result) => {
                            if (err) console.log(err);
                          });
                        }
                      }
                      )
                    }
                  }
                  )
                  rcpt.map((arr, i) => {
                    const URcpt = "UPDATE Recipe SET RcpT" + (i + 1) + "=(?) where FoodId = (?);"; //계산값 퇴근표시 
                    if (i > 0 && i < 20) {
                      db.query(URcpt, [rcpt[i], index], (err, res) => {
                        if (err) {
                          db.query(erraa, [index], (err, result) => {
                            if (err) console.log(err);
                          });
                        }
                      }
                      )
                    }
                  })
                  rcpi.map((arr, i) => {
                    const URcpi = "UPDATE Recipe SET RcpI" + (i + 1) + "=(?) where FoodId = (?);"; //계산값 퇴근표시 
                    if (i > 0 && i < 20) {
                      db.query(URcpi, [rcpi[i], index], (err, res) => {
                        if (err) {
                          db.query(erraa, [index], (err, result) => {
                            if (err) console.log(err);
                          });
                        }
                      }
                      )
                    }
                  })
                  index++
                  delay(3000);
                }
              );
            }
          );
        }
      )


    }).catch((err) => {
      index++;
      console.log(err);
      delay(2000);
    });
}



async function delay(ms) {
  await setTimeout(() => { a() }, ms);
}

delay(1000);