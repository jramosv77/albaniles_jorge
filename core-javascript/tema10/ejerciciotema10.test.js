const { actualizarcronometro, iniciarcronometro, pruebastiempo } = require("./ejerciciotema10");

jest.useFakeTimers();

describe("Cronómetro", () => {
  let cronometro;
  let botoniniciopausa;
  let botonreseteo;

  beforeEach(() => {
    jest.spyOn(global, "setInterval");
    jest.spyOn(global, "clearInterval");
    // Creamos elementos DOM simulados
    cronometro = document.createElement("div");
    cronometro.id = "cronometro";
    document.body.appendChild(cronometro);

    botoniniciopausa = document.createElement("button");
    botoniniciopausa.id = "botoniniciopausa";
    document.body.appendChild(botoniniciopausa);

    botonreseteo = document.createElement("button");
    botonreseteo.id = "botonreseteo";
    document.body.appendChild(botonreseteo);

    iniciarcronometro();
    pruebastiempo(0, 0);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  test("aumentan los minutos y se reinician los segundos al llegar a 60", () => {
    pruebastiempo(0, 59);
    actualizarcronometro();
    expect(cronometro.textContent).toBe("01:00");
  });
  test("formato en números menores a 10", () => {
    pruebastiempo(9, 9);
    actualizarcronometro();
    expect(cronometro.textContent).toBe("09:10");
  });
  test("formato en números mayores o iguales a 10", () => {
    pruebastiempo(10, 10);
    actualizarcronometro();
    expect(cronometro.textContent).toBe("10:11");
  });

  test("inicio y pausa del cronómetro correctos", () => {
    botoniniciopausa.click();
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    jest.advanceTimersByTime(7000);
    expect(cronometro.textContent).toBe("00:07");

    botoniniciopausa.click();
    expect(clearInterval).toHaveBeenCalled();
  });

  test("reseteo correcto", () => {
    botoniniciopausa.click();
    jest.advanceTimersByTime(3000);

    botonreseteo.click();
    expect(clearInterval).toHaveBeenCalled();
    expect(cronometro.textContent).toBe("00:00");
  });
});
