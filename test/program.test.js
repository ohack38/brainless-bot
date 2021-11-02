
class Stack{
    constructor(){
        this.top = -1;
        this.items = {};
    }
    get peek(){
        return this.items[this.top];
    }
    push(value){
        this.top +=1;
        this.items[this.top] = value;
    }
    get remove(){
        return this.items[-1];
    }
}





describe('My Stack',()=> {
    
    let stack;
    beforeEach(()=>{
        stack = new Stack();
    })
    it('is created empty',()=> {

        expect(stack.top).toBe(-1);
        expect(stack.items).toEqual({});
    });
    it('can push to the top',()=> {

        stack.push('banan');

        expect(stack.top).toBe(0);
        expect(stack.peek).toBe("banan");
    });

});

// print the set of modified files since last commit in the current repo
