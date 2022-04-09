async function lol(){
    var question = "Что увидим на экране?"
    var photo = "photo-205320016_457239056" 
    var hard = 5
    var right_answer = '"YES"'
    var explanetion = `Строки в языке Python всегда записываются в двойных кавычках, например: "String". Здесь левые кавычки означают начало строки, а правые - конец строки. 

    А что если нужно внутри самой строки записать двойную кавычку?
    
    В таком случае надо перед ней поставить обратную косую черту. Например "\"" - это строка, содержащая одну двойную кавычку.
    
    В нашем примере на экране увидим слово YES, записанное в двойных кавычках.`
    var keyboardd = Keyboard.keyboard([
        Keyboard.textButton({
            label: "\\YES\\"
        }),
        Keyboard.textButton({
            label: `YES`
        }),
        Keyboard.textButton({
            label: `"YES"`
        }),
        Keyboard.textButton({
            label: `\\"YES\\"`
        })
    ])

    var amount = "SELECT * FROM project WHERE `Vk_ID` = " + context.senderId

    const task = await context.question({message: `Вопрос на ${hard}🌟\n${question}`, attachment: photo, keyboard: keyboardd})
    
    
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