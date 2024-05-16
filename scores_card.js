class Scorecard{
    constructor(){
        this.scores = []
        this.frames = []
    }

    addFrame(rollOne, rollTwo){
        if(this.frames.length < 10){
            this.addFrameOneToNine(rollOne, rollTwo)
            if(rollOne + rollTwo === 10){
                return `Amazing! Your score is ${this.getTotal()} and your bonus will be added in the next round!`
            } else {
                return `Good job, but you can do even better! Your score is ${this.getTotal()}!`
            } 
        } else if (this.frames.length === 10){ 
            this.addFrameTenth(rollOne, rollTwo)
            return `Congratulations!Your total score is ${this.getTotal()}!`
        }else if (this.frames.length > 10){
            return `Please run <scorecard>.reset() to start a new game!`
        }
    }

    //condition for checking if last frame is a Strike
    had_Strike() {
        let prev_frame = this.frames.length - 1
        return this.frames[prev_frame][0] === 10 || this.frames[prev_frame][1] === 10      
    }

    //condition for checking if last frame is a Spare
    had_Spare() {
        let prev_frame = this.frames.length - 1
        return this.frames[prev_frame][0] + this.frames[prev_frame][1] === 10
    }

    //calculating score for frames 1-9
    addFrameOneToNine(rollOne, rollTwo){

        let prev_score = this.scores.length - 1

        if (this.scores.length === 0 || this.scores[prev_score] < 10 ){ //if list is empty or last frame is a regular
            this.frames.push([rollOne,rollTwo])
            this.scores.push(rollOne+rollTwo) 
        } else if(this.had_Strike()){//if last frame is a strike
            this.frames.push([rollOne,rollTwo])
            this.scores.pop()//deletes previous add (10)
            this.scores.push(rollOne + rollTwo + 10) // add new WITH the bonus for the previous frame
            this.scores.push(rollOne + rollTwo)//and finally adds the new frame
        } else if(this.had_Spare()){//if last frame is a spare
            this.frames.push([rollOne,rollTwo])
            this.scores.pop()//deletes previous add (10)
            this.scores.push(rollOne + 10)// add new WITH the bonus for the previous frame
            this.scores.push(rollOne + rollTwo)//and finally adds the new frame
        }
    }

    //calculating score for frame 10
    addFrameTenth(rollOne,rollTwo){

        if (this.scores[9] < 10 ){ 
            console.log(this.frames)
            this.frames.push([rollOne,rollTwo])
            this.scores.push(rollOne+rollTwo) 
        } else if(this.frames[9][0] === 10){//if 10nth frame has a strike
            this.frames.push([rollOne,rollTwo])
            this.scores.pop()//deletes previous add (10)
            this.scores.push(rollOne + rollTwo + 10) // add new WITH the bonus
        }else if (this.frames[9][1] === 10){
            this.frames.push([rollOne,rollTwo])
            this.scores.pop()//deletes previous add (10)
            this.scores.push(rollOne + 10) // add new WITH the bonus
        } else if(this.had_Spare()){//if last frame is a spare
            this.frames.push([rollOne,rollTwo])
            this.scores.pop()//deletes previous add (10)
            this.scores.push(rollOne + 10)// add new WITH the bonus
        }
    }

    getTotal(){
        if(this.scores.length === 0){
            return 0
        } else {
            let total_score = this.scores.reduce((acc,curr)=> acc+curr)
            return total_score
        }
    }   

    reset(){
        this.scores = []
        this.frames = []
    }
}

// const score=new Scorecard()
// console.log(score.addFrame(1,4)) //1st frame
// console.log(score.addFrame(4,5)) //2nd frame
// console.log(score.addFrame(6,4)) //3rd frame
// console.log(score.addFrame(5,5)) //4th frame
// console.log(score.addFrame(10,0)) //5th frame
// console.log(score.addFrame(0,1)) //6th frame
// console.log(score.addFrame(7, 3)) //7th frame
// console.log(score.addFrame(6,4)) //8th frame
// console.log(score.addFrame(10,0)) //9th frame
// console.log(score.addFrame(2,8)) //10thst frame
// console.log(score.addFrame(6,0)) //bonud frame
// console.log(score.addFrame(6,0)) //bonud frame

module.exports = Scorecard