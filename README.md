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
    
  해먹남녀 사이트는 레시피에 대한 많은 정보를 제공하는데, 우리가 필요로 하는 데이터는 단순했다. 재료, Kcal, 조리 시간, 레시피 정보들이였다. Crawling을 담당했던 친구가 Crawling Logic을 고민하고 있었고, 나는 DFS 방식으로 재귀문을 작성하여 정상적으로 원하는 데이터만 뽑아올 수있었다.  
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
  1) Like button을 취소할 수는 없음
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

 
##  :four: What I learned
