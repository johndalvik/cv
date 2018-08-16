/**
 * Index js
 **/

import { Luminous } from 'luminous-lightbox'
import '../css/style.css'

const initLightBox = () => {
  let photos = document.querySelectorAll('a[data-pretty-photo]')
  for (let i = 0, length = photos.length; i < length; i++) {
    new Luminous(photos[i])
  }
}

initLightBox()