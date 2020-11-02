import {Course, totalExtentOfCourses, Extent} from ".";

test('Calculate total extent', () => {
    const course1 = new Course({
        extent: new Extent({
            lecture: 2,
            exercise: 2,
            practical: 2
        })
    })
    const course2 = new Course({
        extent: new Extent({
            lecture: 0,
            exercise: 1,
            practical: 4
        })
    })

    const totalExtent = totalExtentOfCourses([course1, course2])
    expect(totalExtent.lecture).toBe(2)
    expect(totalExtent.exercise).toBe(3)
    expect(totalExtent.practical).toBe(6)
})
