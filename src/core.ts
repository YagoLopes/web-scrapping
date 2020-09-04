require("dotenv/config");
import puppeteer from "puppeteer";

function createCore() {
  async function start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(process.env.APP_LOGIN_URL || "");
    await page.click(".semibold");
    await page.type(
      process.env.APP_USER_INPUT_ID || "",
      process.env.APP_USER || ""
    );
    await page.type(
      process.env.APP_PASSWORD_INPUT_ID || "",
      process.env.APP_PASSWORD || ""
    );
    await page.click(process.env.APP_BUTTON_SUBMIT_CLASS || "");
    await page.waitForNavigation();
    await page.goto(
      "https://www.grancursosonline.com.br/aluno/aula-pdf/curso/codigo/UAN8aBFU3dQ%3D/c/BxQa4yZhWsg%3D"
    );

    await page.evaluate(() => {
      const nodeList: any = document.querySelector("#alterar-disciplina");

      const linkArray = [...nodeList];
      const arrayData = linkArray.map((link) => ({
        value: link.value,
      }));
      /***************************************** */
      arrayData.map(({ value }) => {
        if (!value) {
          return null;
        }
        const optionAtual = document.querySelector(
          `option[value="${value}"]`
        ) as HTMLOptionElement;
        optionAtual.selected = true;

        const nodeList: any = document.querySelectorAll("#alterar-aula");

        const linkArray = [...nodeList];
        const arrayData = linkArray.map((link) => ({
          value: link.value,
        }));

        arrayData.map(({ value }) => {
          if (!value) {
            return null;
          }

          const optionAtual = document.querySelector(
            `option[value="${value}"]`
          ) as HTMLOptionElement;
          optionAtual.selected = true;

          setTimeout(() => {
            document.getElementById("baixar-aula")?.click();
            console.log("Clickei!!!");
          }, 2000);
        });
      });
    });

    //  await browser.close();
  }

  return { start };
}

export default createCore;
