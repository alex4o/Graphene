import _ from "lodash";

var participants = [
	"Graphene",
	"Carbon"
]

var dialogue = [
	{
		name: "intro_dialog",
		array: [
			{ //loc: 0
				//say: "Loerm ipsum"
				who: "Карбон",
				say: "Кой си ти?",
				loc: 1
			},
			{ //loc: 1
				who: "Графен",
				say: "Аз съм материал създаден от един ред въглеродни атоми и имам уникални свойства!",
				loc: 2
			},
			{ //loc: 2
				who: "Карбон",
				say: "Хаха, за много по-полезен ли се мислиш?",
				loc: 3
			},
			{ //loc: 3
				who: "Графен",
				answer: [
					{ say: "Покажи свойствата си.", loc: 4 },
					{ say: "Опитай да решиш всичко с думи.", loc: 6 /* scene: "use_words" */},
					{ say: "Игнорирай го.", loc: 9}
				]
			},
			{ //loc: 4
				who: "Графен",
				say: "Да.",
				loc: 5
			},
			{ //loc: 5
				who: "Карбон",
				say: "Не мисля, че е възможно да имаш по-добри характеристики от моите.",
				loc: 13
			},
			{ //loc: 6
				who: "Графен",
				say: "Няма смисъл да спорим.",
				loc: 7

			},			
			{ //loc: 7
				who: "Карбон",
				say: "Да прав си!",
				loc: 8
			},
			{ //loc: 8
				who: "Графен",				
				answer: [
					{ say: "Остави го да говори.", loc: 16},
					{ say: "Все пак му покажи възможностите си.", loc: 18}
				]
			},
			{ //loc: 9
				who: "Карбон",
				say: "Защо ме игнорираш, да не ме имаш за много по-слаб?",
				loc: 10
			},
			{ //loc: 10
				who: "Карбон",
				say: "Сигурно те е страх, че не можеш да покажеш нищо кой знае какво!?",
				loc: 11
			},
			{ //loc: 11
				who: "Графен",
				say: "Не искам да навлизам в излишни конфликти.",
				loc: 12
			},
			{  //loc: 12
				who: "Карбон",
				say: "Така ли? Покажи ми какво можеш тогава.",
				loc: 13 //"conductivity"
			},
			{ //loc: 13
				who: "Графен",
				say:  "С моята невероятната здравина от 1100 GPa, ще спра метеорита летящ към земята.", //"Сега не е времето за това!! Виж метеорит е на път да се разбие в земята, трябва да го спрем!!!",
				loc: 14
			},
			{  //loc: 14
				who: "Карбон",
				say: "Не ми трябваш, аз мога да се справя сам.",
				scene: "mech_force"
			},
			{ //loc: 15
				who: "Графен",
				say: "...",
				scene: "mech_force"
			},
			{ //loc: 16
				who: "Карбон",
				say: "Почуствах се застрашен. Не искам да повярвам, че има по-полезна вариация на въглерода от мен.",
				loc: 17
			},			
			{ //loc: 17
				who: "Карбон",
				say: "Аз съм здрав, лек и всичко което някой би искал.",
				loc: 18
			},
			{ //loc: 18
				who: "Графен",
				say: "Ами да, но е факт ,че аз съм по-топлопроводим, здав и с по-голяма енергийна плътност",
				loc: 19
			},
			{ //loc: 19
				who: "Карбон",
				say: "Разбира се!",
				loc: 20
			},
			{ //loc: 20
				who: "Графен",
				say: "Например благодарение на моята електропроводимост от 1738 siemens/m мога да заредя телефон за секунди!",
				scene: "conductivity_good" 
			},
			{ //loc: 21
				who: "Графен",
				say: "С моята невероятната здравина от 1100 GPa ще спра метеорита летящ към земята!",
				loc: 13 
			},
		]
	},
	{
		name: "asteroid_dialog",
		array: [
			{ //loc: 0
				who: "Карбон",
				say: "Просто изкара късмет, че нямах време да направя стената по-голяма.",
				loc: 1
			},
			{
				who: "Графен",
				say: "Дали? Или просто аз съм по-здравия?",
				loc: 2
			},
			{ //loc: 2
				who: "Карбон",
				say: "Да видим другите ти свойства тогава.",
				loc: 3
			},
			{ //loc: 3
				who: "Графен",
				say: "Както пожелаеш.",
				scene: "compete_hard" 
			}
		]
	},
	{
		name: "compete_hard_dialog",
		array: [
			{ //loc: 0
				who: "Карбон",
				say: "Чакам. ",
				loc: 1
			},
			{ //loc: 1
				who: "Графен",		
				answer: [
					{ say: "Покажи - електропроводимост от 1738 siemens/m", loc: 2 },
					{ say: "Покажи - енергийна плътност от 75 F/g и 31·9 Wh/kg", loc: 3 }
				]
			},
			{ //loc: 2
				who: "Графен",
				say: "Ето виж!",
				scene: "conductivity"
			},
			{ //loc: 3
				who: "Графен",
				say: "Ето виж!",
				scene: "electrical_density"
			}

		]
	},
		{
		name: "good_dialog",
		array: [
			{ //loc: 0
				who: "Графен",
				say: "A също така, бaтерия/акомулатор, направена с моята помощ, издържа в пъти повече от нормална батерия.",
				scene: "electrical_density_good"
			}

		]
	},
	{
		name: "ed_c_dialog",
		array: [
			{ //loc: 0
				who: "Графен",
				say: "А виж какво мога, благодарение на моята електропроводимост от 1738 siemens/m.",
				scene: "conductivity_2"
			},
		]
	},
	{
		name: "c_c_dialog",
		array: [
			{ //loc: 0
				who: "Графен",
				say: "А виж какво мога, благодарение на моята енергийна плътност от 75 F/g и 31·9 Wh/kg.",
				scene: "electrical_density_2"
			},
		]
	},
	{
		name: "ending_dialog_1",
		array: [
			{
				who: "Карбон",
				say: "Добре признавам че си по-полезен в повечето ситуации!",
				scene: "end_true"
			}
		]
	},
	{
		name: "ending_dialog_2",
		array: [
			{
				who: "Карбон",
				say: "Разбирам и признавам, че си по полезен!",
				scene: "end_true"
			}
		]
	}

]


window.d = dialogue

export default class Dialogue {
	constructor(){
		this.dialogue = dialogue;
	}

	select(name){
		this.currentDialogue = _.find(this.dialogue, ["name", name])
		this.currentPhrase = this.currentDialogue.array[0]
	}

	phrase(loc){
		return this.currentDialogue.array[loc];
	}


	choices(){
		return _.map(this.currentPhrase.answer, "say");
	}

	hasChoices(){
		if(this.currentPhrase){
			return this.currentPhrase.answer != null
		}
		return false
	}

	say(){
		return this.currentPhrase
	}

	hasNext(){
		return this.loc < (this.currentDialogue.array.length() - 1)
	}

	next(choice){
		if(this.currentPhrase.answer){
			if(arguments.length > 0){
				if(choice <= this.currentPhrase.answer.length){
					if(this.currentPhrase.answer[choice].scene){
						return this.currentPhrase.answer[choice].scene
					}
					this.loc = this.currentPhrase.answer[choice].loc
					this.currentPhrase = this.phrase(this.currentPhrase.answer[choice].loc);

				}else{
					throw "This answer does not exists"
				}
			}else{
				throw "This transition to the next phrase requires an argument"
			}
		}else if(this.currentPhrase.loc){
			this.loc = this.currentPhrase.loc
			this.currentPhrase = this.phrase(this.currentPhrase.loc);
		}else if(this.currentPhrase.scene){
			return this.currentPhrase.scene
		}
		
		console.log(this.loc)


	}
}