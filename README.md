# Refribank BackEnd :bank:  
![image](https://user-images.githubusercontent.com/76645095/161995407-0c4c5d9a-7a21-4fe2-804f-ce4673bdfbfb.png)

## :bulb: The purpose of a project
  First cooperation project
  
## :one: Idea  
  여러분의 냉장고는 현재 어떤 상태인가요?
가지고 있는 식재료로 어떤 요리를 할지 고민이 되거나 또는 잊혀진 식재료가 있지는 않나요?


이러한 고민을 가진 5명의 학생들이 제작한 Refri Bank는
냉장고를 의미하는 Refrigerator와 관리를 대신수행하는 Bank를 합친 단어입니다.


처음엔 단순히 냉장고에 들어있는 식재료를 사용할 수있는 레시피 추천 서비스를 구상하였으나,
추가적으로 저희가 가진 데이터를 이용하여 실시간 인기 레시피, 내가 등록한 식재료의 유통기한, 재료나 제목을 통한 레시피 검색기능, 자유게시판 등을 만들어 최대한 다양한 서비스를
제공할 수 있도록 제작하였습니다.


어서 실시간으로 인기있는 레시피, 혹은 궁금한 레시피를 검색해보세요!
만약 회원가입을 하시면 냉장고 페이지에서 식재료의 유통기한을 표시할 수있고,
Refri Bank는 냉장고에 들어있는 식재료를 바탕으로 하여 추천 레시피를 제공해줍니다.
    
##  :two: Technology stack
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/express-000000?style=flat&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>  
##  :three: Trouble
  :unlock: Communication  
  :key: 모든 팀원들이 협업 경험이 단 한번도 존재하지 않아, trouble이 자주 발생하였다.  
  변수명 규칙을 지키지 않거나, git collision이 매우 자주 발생하였고, 프로젝트 마감 일자가 다가올 수록 서로 많이 다투기도 하였다.  
  다툴수는 있으나, 감정이 상해 앞으로의 작업에 영향을 주는 것은 문제가 될 수있었기에, 나는 하루의 작업이 끝나고 각자 다른 팀원들을 칭찬하는 칭찬하는 시간을 만들었고, 결과적으로 무사히 프로젝트를 마칠 수있었다.  
    
  :unlock: Crawling  
  :key: 해먹남녀라는 사이트에서 Crawling을 허용하여 해먹남녀 사이트를 Crawling 하였다. 
    
  ![image](https://user-images.githubusercontent.com/76645095/161999343-4cb5fdab-d350-4390-986a-a8ea1642f2ed.png)  
    
  해먹남녀 사이트는 레시피에 대한 많은 정보를 제공하는데, 우리가 필요로 하는 데이터는 단순했다. 재료, Kcal, 조리 시간, 레시피 정보들이였다. Crawling을 담당했던 친구가 Crawling Logic을 고민하고 있었고, 나는 재귀문을 작성하여 정상적으로 원하는 데이터만 뽑아올 수있었다.  
    
  ![image](https://user-images.githubusercontent.com/76645095/161999871-fa42a194-3f2c-442b-8577-ea462095bc6a.png)  
  ![image](https://user-images.githubusercontent.com/76645095/162000067-55c9180e-ec61-40ea-bacd-c77ad5ed8c4a.png)  
    
  이 데이터를 이용하여 Recipe PK에 따른 REST API를 전송해주었다.  
  
  :unlock: GetRecipe Method  
  :key: 아래의 화면에서 보이는 데이터를 보내주기 위해 모든 Recipe를 가져오는 Method가 필요했고, Method에 대한 고민이 필요했다.  
    
  ![image](https://user-images.githubusercontent.com/76645095/162003682-7f102f8c-02ff-4ae1-87d6-8c5263845de2.png) 
  Method와 사용된 query는 아래와 같다.  
  
  ``` JavaScript
  
  const mainpage_request = {
    GetFoodMain : async (req,res)=>{
        const req_get_foodmain = new MainClass(req.body);
        const res_get_foodmain = await req_get_foodmain.GetFoodMain();
        return res.json(res_get_foodmain);
    }
  }
  class MainSql {
    static async GetFoodMain(req) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM FoodMain WHERE FoodN LIKE '%"+req.id+"%' ORDER BY likeit DESC";
            db.query(query ,(err, data) => {
                if (err) reject(`${err}`)
                resolve(data);
            });
        });
    }
  }
```  
한번에 모든 데이터를 불러오기에 굉장히 비효율적처럼 보인다. 하지만, 데이터가 그리 많지 않기 때문에 생산성을 높이기 위하여 모든 데이터를 불러오는 query문을 작성하였다.  
  
  :unlock: Like Method  
  :key: 아래의 화면을 보면, 레시피별로 좋아요가 많은 순서대로 추천 레시피를 보여준다. 이를위해, 레시피에 좋아요를 표시할 수있는 버튼이 필요했고, 이 값을 DB에 저장해야 했다.  
    
  ![image](https://user-images.githubusercontent.com/76645095/162005145-29b7ac16-34c4-428b-9ae7-c358ead498a8.png)  
  Like Method에 대한 요구 사항은 아래와 같다.  
  1) Like button에 대한 취소는 다른 페이지에서 진행할 수있음  
  2) 특정 Recipe에 Like를 누른 User는 또 Like를 누를 수없음
  
  User와 Recipe는 N:N 관계이다. 따라서 DB 구조는 아래와 같이 구성하였다.  
  ![image](https://user-images.githubusercontent.com/76645095/162003297-5c9b1fe3-b3b7-425d-9a5c-7b794f409704.png)
  N : 1, 1 : N으로 관계를 풀어 특정 Recipe에 좋아요를 누른 User 정보를 관리하였다.  
  이때 사용된 Method와 query는 아래와 같다.  
  ``` JavaScript
  const recipe_request = {
    AddLike : async (req, res) => {
        const req_add_like = new RecipeClass(req.body);
        const res_add_like = await req_add_like.AddLike();
        return res.json(res_add_like);
    }
  }
  
  class RecipeSql {
    static async AddLike(req) {
        return new Promise((resolve, reject) => {
            const squery = "SELECT * FROM likeit WHERE userid = (?) and foodid = (?) ";
            const lquery = "UPDATE FoodMain SET likeit = likeit+1 WHERE FoodId = (?);";
            const uquery = "INSERT INTO likeit(foodid, userid, foodname) VALUES(?, ?, ?);";
            db.query(squery, [req.userid, req.id], (err, length) => {
                if (err) reject(`${err}`);
                else if (length.length < 1) {
                    db.query(lquery, [req.id], (err, data) => {
                        if (err) reject(`${err}`);
                        else {
                            db.query(uquery, [req.id, req.userid, req.foodname], (err, check) => {
                                if (err) reject(`${err}`);
                                resolve({ success: true });
                            })
                        }
                    });
                }
                else {
                    resolve({ success: false })
                }
            });
        });
    }
  }
  ```
  :unlock: shopping basket method.  
  :key: 아래의 그림과 같이 User가 재료를 선택하여 나만의 냉장고에 넣을 수있다.    
    
 <img width="478" alt="스크린샷 2022-04-07 오후 12 12 37" src="https://user-images.githubusercontent.com/76645095/162113048-57e57a9e-84cd-45c1-83c8-86cc528285bd.png">  
    
  장바구니에 재료를 넣은 뒤, submit button을 누르면, 이 재료에 따라 레시피를 추천해준다.  
  submit button을 누르면, User가 추가한 Ingredient가 Update 되야 하고, 사용한 쿼리문은 아래와 같다.  
  ``` JavaScript
  static async UpdateRFG(user) {
        return new Promise(async (resolve, reject) => {
            const delete_query = "DELETE FROM UserRfg WHERE ID=(?)";
            const insert_query = "INSERT INTO UserRfg(ID, Igdname, Eprdate) VALUES(?, ?, ?);";
            db.query(delete_query, [user.id], (err) => {
                if (err) reject(`${err}`);
                else {
                    db.query(insert_query, [user.id, user.igdname, user.eprdate], (err) => {
                        if (err) reject(`${err}`);
                        else resolve({ success: true });
                    });
                }
            });
        });
    }
  ```
  UserRfg는 User가 가지고 있는 Ingredient에 대한 Table이다. 여기서 기존에 UserRfg에 저장하고 있는 Ingredient를 장바구니에 저장하고, 기존에 저장하고 있던 Ingredient는 전부 DELETE한다. 그후, 현재 장바구니에 들어있는 Ingredient를 다시 UserRfg에 추가하는 방식으로 구현하였다.  
      
  Ingredient에 따라 Recipe를 추천해주기 위한 Ingredient가 필요했는데, 장바구니에 들어있는 랜덤한 Ingredient 1개를 기준으로 추천하였다.  
  사용한 쿼리문은 아래와 같다.  
  ``` JavaScript
   class RfgSql {

    static async GetIgdrc(req) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM FoodMain WHERE FoodId IN (SELECT  FoodId FROM FoodIgd WHERE IgdN1 LIKE '%" + req.igd + "%' OR  IgdN2 LIKE '%" + req.igd + "%' OR  IgdN3  LIKE '%" + req.igd + "%' OR  IgdN4  LIKE '%" + req.igd + "%'  OR  IgdN5  LIKE '%" + req.igd + "%' OR  IgdN6  LIKE '%" + req.igd + "%' OR  IgdN7  LIKE '%" + req.igd + "%' OR  IgdN8  LIKE '%" + req.igd + "%' OR  IgdN9  LIKE '%" + req.igd + "%' OR  IgdN10  LIKE '%" + req.igd + "%' OR  IgdN11  LIKE '%" + req.igd + "%' OR  IgdN12  LIKE '%" + req.igd + "%' OR  IgdN13  LIKE '%" + req.igd + "%' OR  IgdN14  LIKE '%" + req.igd + "%' OR  IgdN15 LIKE '%" + req.igd + "%')"
            db.query(query, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
  }
  ```
  쿼리문을 하드코딩 하였다. 모든 레시피는 Ingredient개수가 달랐다. 어떤 것은 30개가 넘어가기도 하고 어떤것은 10개 이하이기도 했다. 따라서 Crawling을 진행할때 Ingredient를 최대 15개만 가져오기로 결정하였고, Ingredient Column은 15로 고정이 되었으며, 결과물은 아래와 같다.  
    
  <img width="1025" alt="image" src="https://user-images.githubusercontent.com/76645095/162113373-8ac45792-6c7c-4f01-8ccc-c951bd15d74a.png">  
    
  :unlock: Recipe Likeit Method   
  :key: 아래의 그림과 같이 User는 Likeit button을 누른 레시피를 볼 수있다.    
    
  ![image](https://user-images.githubusercontent.com/76645095/162115253-5c8406c6-bece-40f7-b47d-1bf62c420d29.png)  
    
  Recipe와 User는 N:N 관계이기 때문에 이를 풀어낸 Likeit table을 이용하여 이를 구현하였으며, 삭제 method도 마찬가지이다. 사용한 쿼리문은 아래와 같다.  
  ``` JavaScript
  static async Deletelikeit(req) {
        return new Promise((resolve, reject) => {
            const delete_likeit = "DELETE FROM likeit WHERE foodid=(?) and userid=(?);"
            db.query(delete_likeit, [req.number, req.userid], (err, length) => {
                if (err) reject(`${err}`);
                else {
                    resolve({ success: true })
                }
            })
        });
    }
  }
  class Mypagesql {
    static async likeitpage(user){
        return new Promise(async (resolve, reject) => {
            const query = "SELECT * FROM likeit WHERE userid = (?)"
            db.query(query,[user.id], (err,data) => {
                if (err) reject(`${err}`);
                else resolve({data});
            });
        });
    }
  }
  ```  
  :unlock: Board   
  :key: Board 기능은 단순 CRUD만으로 구현하였고, 댓글은 board_id, user_id를 저장하는 Reply table을 구성하여 N:N 관계를 풀어냈다.  
  결과물과 사용한 쿼리문들은 아래와 같다.  
    
<img width="811" alt="image" src="https://user-images.githubusercontent.com/76645095/162115999-b2db6940-28d4-4e52-b5ec-7d6b0f2ecb7d.png">  
    
  ``` JavaScript 
  ////////Reply////////
    static async AddReply(req) {
        console.log(req);
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO Reply(number, userid, nickname, description, created) VALUES(?, ?, ?, ?, ?);"
            const ucount = "UPDATE freeboard SET count = count + 1 WHERE number =(?);"
            db.query(query, [req.number, req.userid, req.nickname, req.description, req.created], (err, data) => {
                console.log(req.created)
                if (err) reject(`${err}`);
                db.query(ucount, [req.number], (err) => {
                    if (err) reject(`${err}`);
                    resolve(data);
                });

            });
        });
    }

    static async GetReply(req) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Reply WHERE number=(?);"
            db.query(query, [req], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
  ```
    
  
##  :four: What I learned  
  
  1) communication  
  누군가에게 나의 주장을 펼치기 위해서는 근거가 필요하다는 것을 배우게 되었다.  
  2) SQL 중심적인 개발의 문제점  
  이 프로젝트는 SQL에 굉장히 의존적이다. 이때 SQL 중심적인 개발의 문제점을 느끼게 되었고, 후에 ORM을 공부하면서 이에대해 블로그에 정리하였다.  
  https://blog.naver.com/ds4ouj/222682683072
  3) 효율성  
  트래픽을 생각하지 않고, 서버 개발을 했다는 문제점을 알게되었다.  
