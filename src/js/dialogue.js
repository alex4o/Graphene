import R from "ramda"

var dialogue = [
	{
		name: "begin",
		array: [ // scene: begin
			{ // loc: 0
				who: "Графен",
				say: "Здравейте!",
			},
			{ // loc: 1
				who: "Карбон",
				say: "Кой си ти?"
			},
			{ // loc: 2
				who: "Графен",
				say: "О, извинете, забравих да се представя!\n Аз съм материал, наречен Графен, създаден от\n един ред въглеродни атоми, и имам уникални свойства!"
			},
			{ // loc: 3
				who: "Карбон",
				say: "Виждам, че си сравнително нов тук!?\nИскаш ли да проверим дали си и полезен??"
			},
			{ // loc: 4
				who: "Графен",
				answer: [
					{ say: "Уверен съм в свойствата си!", loc: 5 },
					{ say: "Не мисля, че е нужно.", loc: 7 },
					{ say: "*Игнорирай го*", loc: 11 }
				]
			},
			{ // loc: 5
				who: "Карбон",
				say: "Мислиш, че си по-добър от мен ли?!?"
			},
			{ // loc: 6
				who: "Карбон",
				say: "Кое ще е първото нещо, с което искаш да се докажеш?",
				answer: [
					{ say: "Eлектропроводимост", scene: "phone" },
					{ say: "Здравината", scene: "asteroid" },
					{ say: "Енергийна плътност", scene:  "cars"},
				]
			},
			{ // loc: 7
				who: "Карбон",
				say: "Не си достатъчно уверен в себе си или просто не си толкова добър?"
			},
			{ // loc: 8
				who: "Графен",
				say: "Така ли мислиш? Имам много качества, с които те превъзхождам!"
			},
			{ // loc: 9
				who: "Карбон",
				say: "Нека видим тогава. Какво ще ни демонстрираш първо?"
			},
			{ // loc: 10
				who: "Графен",
				sat: "Ти си избери!",
				answer: [
					{ say: "Гъвкавост/Компактност", scene: "blood" },
					{ say: "Здравина", scene: "elevator"},
					{ say: "Енергийна плътност", scene:  "cars"},
				]
			},
			{ // loc: 11
				who: "Карбон",
				say: "Защо ме игнорираш? За толкова по-висш от мен ли се смяташ?"
			},
			{ // loc: 12
				who: "Графен",
				answer: [
					{ say: "*Играй с думи*", loc: 13 },
					{ say: "*Свободен разговор*", loc: 16 }
				]
			},
			{ // loc: 13
				who: "Графен",
				say: "Имам много качества с които те превъзхождам!"
			},
			{ // loc: 14
				who: "Карбон",
				say: "Нека видим тогава. Какво ще демонстрираш първо?"
			},
			{ // loc: 15
				who: "Графен",
				say: "Приложението си в:",
				answer: [
					{ say: "Медицината", scene: "blood" },
					{ say: "Космическата архитектура", scene:  "elevator"},
					{ say: "Енергетиката", scene:  "cars"},
				]
			},
			{ // loc: 16
				who: "Карбон",
				say: "Явно не ти се говори, а?"
			},
			{ // loc: 17
				who: "Графен",
				say: "Напротив! Има много какво да видите и чуете от мен!\n Просто не исках да се хваля."
			},
			{ // loc: 18
				who: "Карбон",
				say: "Защо не покажеш тогава на какво си способен тогава?! "
			},
			{ // loc: 19
				who: "Графен",
				say: "Разбира се! Благодарение на моята здравина от 1100 GPa\nкосмическият асансьор е достижим!",
				scene: "elevator",
				tag: "free"
			},
		]
	},
	{
		name: "blood_dialogue",
		array: [ // scene: After blood 
			{ // loc: 0
				who: "Графен",
				say: "И това не е всичко!",
			},
			{ // loc: 1
				who: "Графен",
				//say: "С моята енергийна плътност от 75 F/g и 31-9 Wh/kg\n мога да захранвам устройство много по дълго от теб!",
				say: "Аз съм ненадминат и с моята електропроводимост!",
				tag: "free",
				//scene: "cars"
				scene: "phone"
			}
		]
	},
	{
		name: "asteroid_dialogue",
		array: [ // scene: after meteor
			{ // loc: 0
				who: "Карбон",
				say: "Изкара късмет! И сам можех да се справя с това,\n ако имах повече време да се подготвя.",
				tag: "earth"
			},
			{ // loc: 1
				who: "Графен",
				say: "Земята няма да чака, за да я спасиш!\n Това са просто свойства, които ти не притежаваш!",
				tags: [
					{ name: "free", loc: 9 },
					{ name: "End", loc: 10 },
				]
			},
			{ // loc: 2
				who: "Графен",
				say: "С моята невероятна здравина от 1100 GPa, успях да спра метеора!"
			},
			{ // loc: 3
				who: "Карбон",
				say: "И все пак… само това ли е? Само защото ме превъзхождаш в тази сфера\n не означава, че си толкова велик за колкото се мислиш!"
			},
			{ // loc: 4
				who: "Графен",
				say: "Ооо, имам още много да ти покажа!",
				tags: [
					{ name: "cars", loc: 6 },
					{ name: "elevator", loc: 7 },
					{ name: "blood", loc: 8 },
				]
			},
			{ // loc: 5
				who: "Графен",
				say: "Може да се запознаете с останалите ми свойства, приложими в:",
				answer: [
					{ say: "Медицината", scene: "blood" },
					{ say: "Архитектурата на космическо ниво", scene:  "elevator" },
					{ say: "Енергетиката", scene: "cars" },
				]
			},
			{ // loc: 6
				who: "Графен",
				say: "Може да се запознаете с останалите ми свойства, приложими в:",
				answer: [
					{ say: "Архитектурата на космическо ниво", scene:  "elevator"},
					{ say: "Енергетиката", scene: "cars"},
				]
			},
			{ // loc: 7
				who: "Графен",
				say: "Може да се запознаете с останалите ми свойства, приложими в:",
				answer: [
					{ say: "Медицината", scene: "blood"},
					{ say: "Енергетиката", scene: "cars"},
				]
			},
			{ // loc: 8
				who: "Графен",
				say: "Може да се запознаете с останалите ми свойства, приложими в:",
				answer: [
					{ say: "Архитектурата на космическо ниво", scene:  "elevator"},
					{ say: "Енергетиката", scene: "cars"},
				]
			},
			{ // loc: 9
				who: "Графен",
				say: "С моята енергийна плътност от 75 F/g и 31-9 Wh/kg\n мога да захранвам устройство много по дълго от теб!",
				tag: "blood",
				scene: "cars"
			},
			{ // loc: 10
				who: "Карбон",
				say: "Да, признавам те! Наистина си елемент - чудо!",
				scene: "End"		
			}

		]
	},
	{
		name: "junkction_dialogue",
		array: [ // scene: after many(some) things [cars, elevator, blood]
			{ // loc: 0
				who: "Карбон",
				say: "Очевидно наистина те бива! Има ли още нещо, което можеш да ни покажеш?",
				tags: [
					{ name: "free", loc: 3 },
					{ name: "blood", loc: 1 },
					{ name: "cars", loc: 1 },
					{ name: "space", loc: 2 },

				]
			},
			{ // loc: 1
				who: "Графен",
				say: "Разбира се! Отново благодарение на моята здравина от 1100 GPa,\n космическият асансьор е достижим!",
				scene: "elevator"

			},
			{ // loc: 2
				who: "Графен",
				say: "Видяхте ли на какво съм способен?",
				scene: "blood"
			},

		]
	},
	{
		name: "cars_dialogue",
		array: [ // scene: cars
			{ // loc: 0
				who: "Карбон",
				tags: [
					{ name: "free", loc: 1 },
					{ name: "blood", loc: 2 },
					{ name: "noend", loc: 3 },
				]
			},
			{ // loc: 1
				who: "Карбон",
				say: "Да, признавам те! Наистина си елемент - чудо!",
				scene: "End"
			},
			{ // loc: 2
				who: "Графен",
				say: "Разбира се! Благодарение на моята невероятна здравина от 1100 GPa,\n  космическият асансьор е достижим!",
				scene: "elevator",
				tag: "End"
			},
			{ // loc: 3
				who: "Графен",
				say: "А виждaш ли този метеорит идващ към земята?",
				scene: "asteroid",
				tag: "End"
			},

		]
	},
	{
		name: "phone",
		array: [ //
			{ // loc: 0
				who: "Карбон",
				say: "Признавам, че ти си много добър проводник, с твоята електропроводимост от 178 siemens/m.",
			},
			{ // loc: 1
				who: "Графен",
				say: "Това не е единственото, с което те превъзхождам!",
			},
			{ // loc: 2
				who: "Карбон",
				say: "Нека видим останалите ти свойства!",
				answer: [
					{ say: "Здравина", scene: "asteroid" },
					{ say: "Енергийна плътност", scene: "cars" }
				]
			}
		]
	},
	{
		name: "elevator_dialogue",
		array: [ //
			{ // loc: 0
				who: "Карбон",
				say: "Впечатляващо!",
			},
			{ // loc: 1
				who: "Графен",
				say: "Това не е единственото, с което те превъзхождам!",
			},
			{ // loc: 2
				who: "Графен",
				say: "Виждaш ли този метеорит, идващ към земята?",
				tags: [
					{ name: "asteroid", loc: 4 }
				]
			},
			{ // loc: 3
				who: "Графен",
				say: "Искаш ли да ти покажа какво е здравина?",
				scene: "asteroid"
			},
			{ // loc: 4
				who: "Графен",
				say: "Искаш ли да ти покажа какво е здравина?",
				scene: "cars"
			}
		]
	},
]


window.d = dialogue

export default class Dialogue {
	constructor(tags){
		this.tags = tags
		this.dialogue = dialogue
	}

	select(name){
		this.currentDialogue = R.find(R.propEq("name", name))(this.dialogue)
		this.currentPhrase = this.currentDialogue.array[0]
		this.loc = 0
		if(this.currentPhrase.say == null){
			this.next()
		}
	}

	phrase(loc){ // gives a specific phrase
		return this.currentDialogue.array[loc]
	}


	choices(){
		return this.currentPhrase.answer.map(o => o.say)
	}

	hasChoices(){
		if(this.currentPhrase){
			return this.currentPhrase.answer != null
		}
		return false
	}

	say(){ // Gives the current Phrase
		return this.currentPhrase
	}

	hasNext(){
		return this.loc < (this.currentDialogue.array.length() - 1)
	}

	checkTag(name){
		if(this.tags[name]){
			return this.tags[name] == 1
		}
		return false
	}

	next(choice){
		if(this.currentPhrase.tag){
			this.tags[this.currentPhrase.tag] = 1
		}

		if(this.currentPhrase.answer){
			if(arguments.length > 0){
				if(choice <= this.currentPhrase.answer.length){
					if(this.currentPhrase.answer[choice].scene){
						return this.currentPhrase.answer[choice].scene
					}

					if(this.currentPhrase.answer[choice].loc != null){ // checks if the answer has a location otherwise increment
						this.loc = this.currentPhrase.answer[choice].loc
					}else{
						this.loc += 1
					}

					this.currentPhrase = this.phrase(this.loc)
					
					return null
				}else{
					throw "This answer does not exists"
				}
			}else{
				throw "This transition to the next phrase requires an argument"
			}
		}else if(this.currentPhrase.tags){
			console.log("Tags:", this.tags)
			
			for(let tag of this.currentPhrase.tags){
				console.log("Cur:", tag)
				let name = tag.name
				let inversed = false
				if(tag.name.startsWith("!")){
					name = tag.name.slice(1)
					inversed = true
				}

				if(this.checkTag(name) == !inversed){
					this.loc = tag.loc
					this.currentPhrase = this.phrase(tag.loc)
				}



			}

			this.loc += 1
			this.currentPhrase = this.phrase(this.loc)
			return null
		}else if(this.currentPhrase.loc){
			this.loc = this.currentPhrase.loc
			this.currentPhrase = this.phrase(this.currentPhrase.loc)
			
			return null
		}else if(this.currentPhrase.scene){
			return this.currentPhrase.scene
		}else{
			this.loc += 1
			this.currentPhrase = this.phrase(this.loc)
			return null
		}
	}
}
