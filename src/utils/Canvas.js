
import { onMounted } from 'vue'

const colors = ['rgba(53, 224, 82,0.75)', 'rgba(94, 255, 121,0.75)', 'rgba(149, 255, 167,0.75)']

export default {
  name: 'MatrixComponent',
  setup() {
    onMounted(() => {
      // geting canvas by Boujjou Achraf
      const c = document.getElementById('c')
      const ctx = c.getContext('2d')

      // making the canvas full screen
      c.height = window.innerHeight
      c.width = window.innerWidth

      // chinese characters - taken from the unicode charset
      // var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
      let matrix = '0123456789@#$%^&*()*&^%+-/~{[|`]}'
      // converting the string into an array of single characters
      matrix = matrix.split('')

      const fontSize = 15
      const columns = c.width / fontSize // number of columns for the rain
      // an array of drops - one per column
      const drops = []
      // x below is the x coordinate
      // 1 = y co-ordinate of the drop(same for every drop initially)
      for (let x = 0; x < columns; x++) { drops[x] = Math.random() * c.height }

      // drawing the characters
      function draw() {
        // Black BG for the canvas
        // translucent BG to show trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.045)'
        ctx.fillRect(0, 0, c.width, c.height)

        ctx.fillStyle = '#3ba4db'// blue text
        ctx.font = fontSize + 'px arial'
        // looping over drops
        for (let i = 0; i < drops.length; i++) {
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
          // a random chinese character to print
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          // x = i*fontSize, y = value of drops[i]*fontSize
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          // sending the drop back to the top randomly after it has crossed the screen
          // adding a randomness to the reset to make the drops scattered on the Y axis
          if (drops[i] * fontSize > c.height && Math.random() > 0.975) { drops[i] = 0 }

          // incrementing Y coordinate
          drops[i]++
        }
      }

      setInterval(draw, 40)
    })
  }
}
