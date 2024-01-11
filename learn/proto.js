function Person(firstname, lastname) {
    this.firstname = firstname
    this.lastname = lastname

}

Person.prototype.greet = function () {
    console.log(`Hello ${this.firstname} ${this.lastname}.`)
}

const john = new Person('John', 'Doe')
console.log(john.firstname)
john.greet()


const jane = new Person('Jane', 'Doe')
console.log(jane.firstname)
jane.greet()