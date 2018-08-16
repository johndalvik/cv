'use strict'

/**
 * Index js
 **/

import '../css/style.css'
import { LuminousGallery } from 'luminous-lightbox'
import SmoothScroll from 'smooth-scroll'
import wordcloud from './wordcloud'

const initPage = () => {
  new SmoothScroll('a[href*="#"]')
  new LuminousGallery(document.querySelectorAll('a[data-photo]'), {}, {arrowNavigation: true})
  let mobileMenuBtn = document.querySelector('.navbar-toggle')
  let elementToCollapse = document.querySelector(mobileMenuBtn.dataset.target)
  let links = elementToCollapse.querySelectorAll('a')
  mobileMenuBtn.addEventListener('click', function (event) {
    event.preventDefault()
    elementToCollapse.classList.toggle('collapse')
  })
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (event) {
      elementToCollapse.classList.toggle('collapse')
    })
  }

}

initPage()
wordcloud()