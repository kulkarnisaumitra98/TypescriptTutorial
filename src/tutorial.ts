
/** 
 * BASIC TYPES
*/ 

// Any
let basic: any = 3
basic = 'string'
basic = true


// Boolean
let basic1: boolean = true
basic1 = 'string'


// String
const basic2: string = 'string'


// Number
const basic3: number = 3


// Array
const basic4: string[] = ['hey', "high"]

 
// Tuple
const basic5: [string, number] = ['hey', 4]


// undefined, null
const basic6: undefined = undefined
const basic7: null = null

let basic8: unknown = 5
basic8 = 'string'


// Diff between unknown and any
let unknownFoo: unknown = "string";
let anyFoo: any = 'string'

const var1: string = anyFoo // Allowed because any
const var2: string = unknownFoo	// Not allowed, we dont know the type (Typesafe form of any)

// Objects
const ob: { foo: string, goo: number } = { foo: 'string', goo: 4 }

// Implicit assumptions
const foo = 'gg string' // foo is by default string
let gooAny; // gooAny is any


// Type assertions (Type casting)

let foo1: any = 'my string'
// Lets say you want to use it as string
const strLength: number = (foo1 as string).length


/**
 * Interfaces, Advanced types, Types alias, Extends keyword
 */


// Interfaces
interface Point {
	x: number,
	y: number
}

const poi: Point = { x: 1, y: 1 }

interface Point2dOr3d {
	x: number,
	y: number,
	z?: number
}

const poi2d: Point2dOr3d = { x: 1, y: 1 }
const poi3d: Point2dOr3d = { x: 1, y: 1, z: 1 }


// Union 
let union1: string | number = 'string'
union1 = 4;

let union2: number | null = null
union2 = 3


// Unions with Interfaces

interface Foo1 {
	x: number,
	y: string,
	z: boolean,
	f?: string
}

interface Goo1 {
	h: number,
	k: string,
	z: boolean
}

let foogoo = {} as Foo1 | Goo1; // lets say gets computed from function

foogoo.x = 3  // we dont know weather or not it exists
foogoo.z = true // We know for sure that z will exist

let foogoo1: Foo1 | Goo1 = { h: 3, k: 'string', z: true, x: 3, y: 'string'} // Works

let foogoo2: Foo1 | Goo1 = { 
	h: 3,
	y: 3,
	z: true,
} // Error, Any 1 of the Foo | Goo, partial not allowed

foogoo2 = {
	x: 3,
	y: 'string',
	z: true
} // Fix


// Type alias
type FooGoo = Foo1 | Goo1
type MyBoolean = boolean | 0 | 1
type Category = 'income' | 'expense'

const cat: Category = 'expense'

type Foo2 = {
	x: number,
	y: string
}

// difference between type and interface
// -> https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types


// Intersection

interface Hoo {
	x: number,
	k: string,	
}

interface Shoo {
	h: number,
	y: number,
	z: MyBoolean
}

let hoo: Hoo & Shoo = {
	h: 3,
	x: 1,
	y: 1,
	z: true,
	k: 'string'
} // Just combine all the propertypes


// Extends keyword

interface Base {
	x: number,
	y: number
}

interface Extended extends Base {
	z: number
}

const aoo = {} as Extended

aoo.x + aoo.y + aoo.z


// Functions

// 3 types of function types

// 1.
const add = (x: number, y: number): number => x + y // No need to mention return type number			
// 2.																								// inferred automatically by TS
const add1: (x: number, y: number) => number = (x, y) => x + y

type AddFunc = (x: number, y: number) => number
const add2: AddFunc = (x, y) => x + y


const concatOrAdd = (a: number | string, b: number) => a + b
const concatOrAdd1 = (a: number | string, b: number) => {
	if(typeof a === "number"){
		return a + b
	} 
	
	return a + b
}

const voidFunc = () => {}

// Side note 
const add3: (a: number | string, b: number | string) => number = (a, b) => +a + +b

// Functions in interface

interface FuncWala {
	add(): void,
	abs(x: number): number,
	// any()
}

const obb: FuncWala = {
	add: () => {},
	abs: (x) => Math.abs(x)
}


// When the key is unknown
interface VariableKey {
	[foo: string]: Point
}

const varFoo: VariableKey = {
	hello: { x: 3, y: 4 },
	hello1: {x: 5, y: 6 },
	hello3: 'string',
}


/**
 * Generics
 */

const foo3 = (a: any) => a // Gives us ability to pass anything but we loose type inference
const len = foo3('stirng').length // No type inf

const fooGeneric = <T>(a: T): T => a
const lenGeneric = fooGeneric('string').length // We get type inference, GG 

const gooGeneric = <T, U>(a: T, b: U): [T, U] => [a, b]
const [goo1, goo2] = gooGeneric(3, (a: number) => a)


interface GenericInterface<T> {
	a: T[],
	b: string,
}

type GenericType<Z> = GenericInterface<Z> | Point

type GenericFunc = <T>() => { type: 'SET_GRAPH', payload: T[] }

// Extends with Generic
interface Person {
	firstName: string,
	lastName: string
}

const returnPerson: <T extends Person>(data: T) => T = (data) => data
const person = returnPerson({firstName: 'hello', lastName: 'lol', city: 'jalgaon'})


// Key of
type PersonKeys = keyof Person

// Conditional Generic
const conditionalGeneric = <T>(a : T extends number ? string : null ) => a
const con = conditionalGeneric<number>('string') // Functional call with generic
const con1 = conditionalGeneric<string>(null);


// Imp Utility types
interface Rada {
	x: number,
	y: number
}

// Partial
const partialRada: Partial<Rada> = {};

// ReadOnly
let readonlyRada: Readonly<Rada> = {x : 4, y : 5};
readonlyRada.x = 5 // Error, Because readonly

// Return Type
const returnTypeFunc = (a: number) => a
const returnedValue: ReturnType<typeof returnTypeFunc> = 5

// More Utility Types Here
// -> https://www.typescriptlang.org/docs/handbook/utility-types.html


/**
 * Type Predicates
 */
const eoo = {
	eooProp1: 1,
	eooProp2: 2,
};

const woo = {
	wooProp1: 1,
	wooProp2: 2,
}

type EooType = typeof eoo
type WooType = typeof woo

let wooeoo: EooType | WooType

// This is type predicate
const isWoo = (ob: EooType | WooType): ob is WooType => (ob as WooType).wooProp1 !== undefined


/**
 * Some other types
 */

// never
const infinite = () => {
	while(true);
}

const throwError = () => {
	throw("error")
}

type Never = string & number

// Object
const objx: Object = {}



/**
 * Side example
 */

type Cat = 'cat'
type Snake = 'snake'

interface CommonProps {
	sound: string,
	eyes: number,
}

interface CatProps extends CommonProps {
	legs: number,	
}

interface SnakeProps extends CommonProps {
	venom: boolean
}

interface CatAnimal {
	type: Cat,
	props: CatProps
}

interface SnakeAnimal {
	type: Snake,
	props: SnakeProps
}


type Animal = CatAnimal | SnakeAnimal

const getCatProps = (): CatProps => ({eyes: 2, legs: 4, sound: 'purr'})
const getSnakeProps = (): SnakeProps => ({eyes: 2, venom: true , sound: 'hiss'})

const makeAnimal = (type: Cat | Snake): Animal => {
	let props: CatProps | SnakeProps
	let animal: Animal

	props = type === 'cat' ? getCatProps() : getSnakeProps()

	if(type === 'cat'){
		animal = {
			type,
			props,
		} as CatAnimal;
	} else {
		animal = {
			type,
			props,
		} as SnakeAnimal;
	}	

	return animal
}
