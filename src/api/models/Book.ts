export default class Book {

    constructor(public readonly _id: number,
        public readonly authorid: number,
        public title: string,
        public description: string,
        public readonly code: string,
        public available: boolean) { }

}