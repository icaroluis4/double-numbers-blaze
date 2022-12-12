const puppeteer = require('puppeteer');

console.log("Bem vindo ao bot Blaze ");

(async () => {
  const browser = await puppeteer.launch({headless: false}); //false "Exibição da janela do Chrome"
  const page = await browser.newPage();
  const fs = require("fs");
  let flag = 0;
  let arr = [];
  let count = 0
  

  await page.goto('https://blaze.com/pt/games/double');
  await page.setViewport({width: 1200,height: 800});
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    while(1){
    try{
        data = await page.evaluate(()=> {
               
                let num = document.querySelector('[class = "time-left"]').innerText; //"number" "entry"    

                return{
                    num  //, time , currency
                }
        })
        
        let test = Object.values(data);
        valor = test[0];

        if(flag == 0 && test =="Girando..."){
            console.log("Está girando ! !")
            flag = 1
        }
        else if(flag == 1 && test !="Girando..."){
            test = String(test)
            var str = test
            str = str.match(/(\d+)/);
            str = str[1]
            num = Number(str)
            console.log(num)
            console.log(typeof(num))

            arr.push(num)

            if(arr.length == 500){ //Quando o tamanho do Array chegar a 500 será iniciado o salvamento do arquivo, modificar aqui para a quantidade requerida
                console.log("FIM")
                console.log(arr)
                console.log(typeof(arr))
                console.log(typeof(arr[1]))
                
                const jfile = JSON.stringify(arr);
                console.log("Salvando JSON")
                fs.writeFile("./listDouble_500.json" , jfile, "utf-8" , (err) => { // Arquivo salvo em Formato JSON
                    if(err){
                        console.log(err)
                    }
                    console.log("Arquivo Salvo")
                });

                break;
            }
            count = count + 1
            console.log("Count: " , count) //Contagem dos números salvos no array
            flag = 0
        }
        await page.waitForTimeout(1000);

    }
    catch{
        await page.waitForTimeout(3000);
        console.log(" ERRO ");

    } }

})();