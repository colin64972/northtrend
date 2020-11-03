import { generatePreRenders } from '@cjo3/shared/react/helpers'

import { AppWithTheme } from './AppWithTheme'
import { setStore } from './store'

const pages = [
  {
    name: 'home',
    path: '/'
  },
  {
    name: 'feedback',
    path: '/feedback'
  },
  {
    name: 'error',
    path: '/*'
  }
]

let renders

try {
  renders = generatePreRenders(pages, AppWithTheme, setStore())
} catch (error) {
  console.error('ERROR generatePreRenders'.red, error)
}
export const preRenders = renders
