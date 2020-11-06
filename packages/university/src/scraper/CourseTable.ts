import { Course } from '../Course.entity'
import { Extent } from '../Extent'

export class CourseTable {
    /**
    * 1) Link to module, text is name of module
    * 2) Links to this module with different coees
    * 3) Extent
    * 4) Languages
    * 5) Teachers
    * 6) Institute
    */
    constructor(private tableElement: HTMLElement) { }

    parseCourseColumn(cell: HTMLElement): string {
        const link = cell.querySelector('a')
        if (link !== null) {
            const courseName = link.textContent.trim()
            const courseLink: object = link.attributes
            // @ts-ignore
            console.log('Course: ', courseName, " -> ", courseLink['href'].textContent)

            return courseName
        } else {
            return cell.textContent.trim()
        }
    }

    parseCodeLinksColumn(cell: HTMLElement) {
        const codeLinks = cell.querySelectorAll('a')
        console.log(`Found ${codeLinks.length} codes`)

        for (const codeLink of codeLinks.values()) {
            // @ts-ignore
            console.log('Code: ', codeLink.text, ' -> ', codeLink.attributes["href"].textContent)
        }
    }

    parseExtentColumn(cell: HTMLElement): Extent {
        const extentCell = cell
        const [lecture, exercise, practical] = extentCell.textContent.split('/').map(x => Number.parseInt(x))
        const extent = new Extent({ lecture, exercise, practical })
        return extent
    }

    parseLanguagesColumn(cell: HTMLElement): string[] {
        const language = cell.textContent
        return [language]
    }

    parseTeachersColumn(cell: HTMLElement): string[] {
        return cell.textContent.trim().split(', ')
    }

    parseInstituteColumn(cell: HTMLElement): string {
        return cell.querySelector('a').textContent
    }

    parse(): Course[] {
        return Object.values(this.tableElement.querySelector('tbody').querySelectorAll('tr')).map(row => {
            const cells = row.querySelectorAll('td')

            const link = cells[0].querySelector('a')
            const name = this.parseCourseColumn(cells[0])
            const extent = this.parseExtentColumn(cells[2])
            const languages = this.parseLanguagesColumn(cells[3])
            const teachers = this.parseTeachersColumn(cells[4])
            const institute = this.parseInstituteColumn(cells[5])

            const course = new Course({ name, extent, teachers, languages, institute, master: false })
            console.log('New course:', course)
            return course
        })
    }
}