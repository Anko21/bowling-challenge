const Scorecard = require('./scores_card')


describe('Scorecard isStrike functionality', () => {
    test('when I add a regular frame, returns false', () => {
        scorescard = new Scorecard()
        scorescard.addFrame(1,2)
        expect(scorescard.had_Strike()).toEqual(false)
    })
    test('when I add a strike at 1st roll, returns true', () => {
        scorescard = new Scorecard()
        scorescard.addFrame(10,0)
        expect(scorescard.had_Strike()).toEqual(true)
    })
    test('when I add a strike at 2st roll, returns true', () => {
        scorescard = new Scorecard()
        scorescard.addFrame(0,10)
        expect(scorescard.had_Strike()).toEqual(true)
    })
    test('when I add a spare, returns false', () => {
        scorescard = new Scorecard()
        scorescard.addFrame(9,1)
        expect(scorescard.had_Strike()).toEqual(false)
    })
})

describe('Scorecard isSpare functionality', () => {
    test('when I add a regular frame returns false', () => {
        scorescard = new Scorecard()
        scorescard.addFrame(1,2)
        expect(scorescard.had_Spare()).toEqual(false)
    })
    test('when I add a spare, returns true', () => {
        scorescard = new Scorecard()
        scorescard.addFrame(2,8)
        expect(scorescard.had_Spare()).toEqual(true)
    })
})

describe('Scorecard addFrame functionality', () => {
    describe('Scorecard addFrameOneToNine functionality', () => {
        test('when I add a regular frame, I can see it in my frames list', () => {
            scorescard = new Scorecard()
            scorescard.addFrame(1,2)
            expect(scorescard.frames).toEqual([[1,2]])
        })
        test('when I add a regular frame, I can see total scores in my score list', () => {
            scorescard = new Scorecard()
            scorescard.addFrame(1,2)
            expect(scorescard.scores).toEqual([3])
        })
        test('when I add a strike, I can see bonus added in my score list', () => {
            scorescard = new Scorecard()
            scorescard.addFrame(10,0)
            scorescard.addFrame(1,2)
            expect(scorescard.scores).toEqual([13,3])
        })
        test('when I add a spare, I can see bonus added in my score list', () => {
            scorescard = new Scorecard()
            scorescard.addFrame(2,8)
            scorescard.addFrame(1,2)
            expect(scorescard.scores).toEqual([11,3])
        })
    })
    
    describe('Scorecard addFrameTenth functionality', () => {
        test('when I add a regular frame, I can see it in my frames list', () => {
            scorescard = new Scorecard()
            scorescard.scores = [1,2,3,4,5,6,7,8,9]
            scorescard.addFrame(1,2)
            expect(scorescard.scores).toEqual([1,2,3,4,5,6,7,8,9,3])
        })
        test('when I add a spare, another roll is added only as bonus', () => {
            scorescard = new Scorecard()
            scorescard.scores = [1,2,3,4,5,6,7,8,9,10]
            scorescard.frames = [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,9],[5,5]]
            scorescard.addFrameTenth(3,0)
            expect(scorescard.scores).toEqual([1,2,3,4,5,6,7,8,9,13])
        })
        test('when I add a strike on 1st roll, two other rolls are added only as bonus', () => {
            scorescard = new Scorecard()
            scorescard.scores = [1,2,3,4,5,6,7,8,9,10]
            scorescard.frames = [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,9],[10,0]]
            scorescard.addFrameTenth(5,2)
            expect(scorescard.scores).toEqual([1,2,3,4,5,6,7,8,9,17])
        })
        test('when I add a strike on 2st roll, one other roll is added only as bonus', () => {
            scorescard = new Scorecard()
            scorescard.scores = [1,2,3,4,5,6,7,8,9,10]
            scorescard.frames = [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,9],[0,10]]
            scorescard.addFrameTenth(5,2)
            expect(scorescard.scores).toEqual([1,2,3,4,5,6,7,8,9,15])
        })
    })
})

describe('Scorecard getTotal functionality', () => {
    test('when my scores list is empty I get 0', () => {
        scorescard = new Scorecard()
        expect(scorescard.getTotal()).toEqual(0)
    })
    test('when I add some, returns the total score', () => {
        scorescard = new Scorecard()
        scorescard.addFrame(1,2)
        scorescard.addFrame(5,2)
        scorescard.addFrame(3,2)
        expect(scorescard.getTotal()).toEqual(15)
    })
})