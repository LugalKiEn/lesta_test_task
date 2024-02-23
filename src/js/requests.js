const getData = (method) => {
    switch (method) {
      case 'canon':
        return {
          "header_data": [
            {
                "header_text": "Т-34-85 РАСШИРЕННАЯ",
                "header_img": "https://ru-wotp.lesta.ru/static/5.130.8_ec798f/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/modules/vehicleturret.png"
            },
            {
                "header_text": "85 ММ Д-5Т-85БМ",
                "header_img": "https://ru-wotp.lesta.ru/static/5.130.8_ec798f/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/modules/vehiclegun.png"
            }
          ],
          "data": {
              "Урон": "180 / 180 / 300 ед.",
              "Бронепробиваемость": "144 / 194 / 44 мм",
              "Время перезарядки орудия": "6 с",
              "Скорострельность": "10 выстр/мин",
              "Урон в минуту": "1 800 ед/мин",
              "Время сведения": "2,30 с",
              "Разброс на 100 м": "0,37 м",
              "Боезапас": "48 шт"
          }
        }
        case 'armor':
          return {
            "data": {
                "Прочность": "810 ед.",
                "Бронирование корпуса": "45 / 45 / 40 мм",
                "Бронирование башни": "90 / 75 / 52 мм",
                "Время ремонта ходовой": "12,03 с"
            }
          }
        case 'rally':
          return {
            "header_data": [
                {
                    "header_text": "T-34-85-60",
                    "header_img": "https://ru-wotp.lesta.ru/static/5.130.8_ec798f/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/modules/vehiclechassis.png"
                },
                {
                    "header_text": "B-54K",
                    "header_img": "https://ru-wotp.lesta.ru/static/5.130.8_ec798f/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/modules/vehicleengine.png"
                }
            
            ],
            "data": {
                "Масса/Предельная масса": "33,65 / 35,30 т",
                "Мощность двигателя": "600 л.с",
                "Удельная мощность": "17,83 л.с./т",
                "Максимальная скорость": "54 км/ч",
                "Скорость поворота": "38 град/с",
                "Скорость поворота башни": "46 град/с"
            }
          }
          default: 
            return {
              "name": "Т-34-85",
              "data": {
                  "Прочность": "810 ед.",
                  "Урон": "180 / 180 / 300 ед.",
                  "Бронепробиваемость": "144 / 194 / 44 мм",
                  "Время сведения": "2,30 с",
                  "Разброс на 100 м": "0,37 м",
                  "Время перезарядки орудия": "6 с",
                  "Мощность двигателя": "600 л.с",
                  "Максимальная скорость": "54 км/ч",
                  "Бронирование корпуса": "45 / 45 / 40 мм",
                  "Бронирование башни": "90 / 75 / 52 мм"
              }
            }
    }
}

export default getData;