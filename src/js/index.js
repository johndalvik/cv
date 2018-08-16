/**
 * Index js
 **/

import '../css/style.css'

const d3 = require('d3'),
  cloud = require('d3-cloud')

const words = [
  {text: 'JavaScript', size: 100},
  {text: 'HTML', size: 100},
  {text: 'CSS', size: 100},
  {text: 'SCSS', size: 80},
  {text: 'Vue.js', size: 70},
  {text: 'AngularJS 1', size: 60},
  {text: 'AngularJS 2', size: 60},
  {text: 'Git', size: 60},
  {text: 'Node.js', size: 30},
  {text: 'jQuery', size: 75},
  {text: 'WebStorm', size: 45},
  {text: 'GitHub', size: 85},
  {text: 'GitLab', size: 55},
  {text: 'PHP', size: 30},
  {text: 'WordPress', size: 40},
  {text: 'BootStrap', size: 65},
  {text: 'Linux', size: 40},
  {text: 'Web development', size: 40},
  {text: 'Gulp', size: 30},
  {text: 'Webpack', size: 40},
  {text: 'EcmaScript 6', size: 50},
  {text: 'ES6', size: 58},
  {text: 'ES7', size: 52},
  {text: 'Jenkins', size: 25},
]

let width = document.querySelector('.skills').offsetWidth - 30
let wordCloud = d3.select('.skills')

const layout = cloud()
  .size([width, 300])
  .words(words)
  .padding(5)
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .font('Impact')
  .fontSize((d) => { return d.size })
  .on('end', draw)

layout.start()

wordCloud
  .on('resize', () => {
    console.log('asdasd')
    layout.start()
  })

function draw (words) {
  wordCloud.append('svg')
    .attr('width', layout.size()[0])
    .attr('height', layout.size()[1])
    .append('g')
    .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
    .selectAll('text')
    .data(words)
    .enter().append('text')
    .style('font-size', (d) => { return d.size + 'px' })
    .style('font-family', 'Impact')
    .style('fill', '#fff')
    .attr('text-anchor', 'middle')
    .attr('transform', (d) => {
      return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
    })
    .text((d) => { return d.text })
}