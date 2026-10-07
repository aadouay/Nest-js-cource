

// l'encapsulation
// L'objet protège son état interne et expose uniquement les opérations
// que les autres parties du programme ont le droit d'utiliser.

// class Student{
//     name: string;
//     age: number;

//     constructor(name: string, age:number){
//         this.name = name;
//         this.age = age;
//     }

//     introduce(){
//         console.log(`My name is ${this.name} and I am ${this.age} years old`);
//     }
// }

// const student1 = new Student("Ayoub", 27);
// // const student2 = new Student("Adam", 20);

// student1.age = -100;
// student1.name = "";

// student1.introduce()

// class Student {

//     constructor(private name: string, private age: number,
//                 public readonly id: number) {}
//     introduce() {
//         console.log(`My name is ${this.name} and I am ${this.age} years old`);
//     }
//     changeAge(newAge: number){
//         if(newAge < 0){
//             console.log('refuse : invalid Age !');
//             return ;
//         }     
//         else
//             this.age = newAge;
//     }
// }


// const student = new Student("Ayoub", 27, 1);

// student.introduce();

// student.changeAge(28);
// student.introduce();

// student.changeAge(-100);
// student.introduce();

// console.log(student.id); // doit fonctionner

// student.name = "Adam"; ne dois pas ce passe ! 
// student.id = 10; aussi car le variable est readonly!


// class Person {
//     constructor(public name: string, public age: number){}
//     introduce(){
//         console.log(`I'm ${this.name}`);
//     }
// }

// class Student extends Person {
    
// }

