async function lol(){
    var question = "Что напечатает эта программа?"
    var photo = "photo-205320016_457239116"
    var hard = 8
    var right_answer = "2 1"
    var explanetion = `Здесь надо понимать, что переменная x внутри функции f и глобавльная переменная x это две разные переменные с одинаковым именем. Это допустимо так как каждая из них "живет" и "видима" только внутри своей функции. Это так называемые "локальные переменные". 

    В жизни тоже так бывает. Например, "Антон" из "5А" класса и "Антон" из "5Б" класса имеют одинаковые имена, но при этом они два разных человека.
    
    При вызове функции на 6 строчке значение из переменной x (глобальной) копируется в переменную x (из f). Внутри функции f печатается увеличенное значение 2, а после этого на 13 строчке печатается значение 1. В итоге на экране увидим 2 1.`
    var amount = "SELECT * FROM project WHERE `Vk_ID` = " + context.senderId

    const task = await context.question({message: `Вопрос на ${hard}🌟\n${question}`, attachment: photo})
    
    
    if(task.text == right_answer) {
        var plus = "UPDATE `project` SET `tasks` = tasks + 1, Solved_Tasks = Solved_Tasks + 1, Points = Points + " + hard + " WHERE `Vk_ID` = "+ context.senderId
        conn.query(plus, (err, res) => {
            if(err) {
                console.log(err)
            }
            else {
                conn.query(amount, (err, res) => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        context.send({ message: `${phrases_plus[random_plus]}\nЛови ${hard}🌟`, keyboard: continuetion})
                        context.send({ message: `Сейчас у тебя ${res[0].Points}🌟\nПродолжаем проходить квест?`, keyboard: continuetion})
                    }
                })
            }
        })
    }
    else {
        var minus = "UPDATE `project` SET `tasks` = tasks + 1, Points = Points - 1 WHERE `Vk_ID` = "+ context.senderId
        conn.query(minus, (err, res) => {
            if(err) {
                console.log(err)
            }
            else {
                conn.query(amount, (err, res) => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        context.send({ message: `${phrases_minus[random_minus]}\n\n${explanetion}`, keyboard: continuetion})
                        context.send({ message: `Сейчас у тебя ${res[0].Points}🌟\nПродолжаем проходить квест?`, keyboard: continuetion})
                    }
                })
            }
        })
    }  
}

lol()