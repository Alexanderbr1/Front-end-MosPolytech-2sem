const btnStart = document.querySelector('.btn-start');
const btnCreate = document.querySelector('.btn-create');
const body = document.querySelector('#body');

function getTransformProperty() {
    properties = ['translateX', 'translateY', 'rotate', 'scale', 'perspective', 'skew'];
    let property = properties[Math.floor(Math.random() * properties.length)];
    return property;
}

function getRandomColor() {
    colors = [  'hsl(0, 100%, 50%)',
                'hsl(30, 100%, 50%)',
                'hsl(60, 100%, 50%)',
                'hsl(90, 100%, 50%)',
                'hsl(120, 100%, 50%)',
                'hsl(150, 100%, 50%)',
                'hsl(180, 100%, 50%)',
                'hsl(210, 100%, 50%)',
                'hsl(240, 100%, 50%)',
                'hsl(270, 100%, 50%)',
                'hsl(300, 100%, 50%)',
                'hsl(330, 100%, 50%)',
                'hsl(360, 100%, 50%)' 
            ];
    let color = colors[Math.floor(Math.random() * colors.length)];
    return color;
}

function getTransformValue() {
    return Math.floor(Math.random() * 360);
}

animationParams = {
    duration: 2000,
    direction: 'alternate',
}

function AnimationTarget(el, animationParams) {
    this.el = el;
    this.animationParams = animationParams;

  
    this.animate = function() {
        const transformProperty = getTransformProperty();
        let transformValue = getTransformValue();
        let bgcColorValue = getRandomColor();
        if (transformProperty == 'scale')  {
            transformValue = 2;
        }

        let animation = anime({
            targets: this.el,
            ...this.animationParams,
            [transformProperty]: transformValue,
            background : bgcColorValue
        });

        animation.finished.then(() => {
            console.log('Animation finished on element:', this.el);
          });
    }
  }

const animatedElement = new AnimationTarget(btnStart, animationParams);
btnStart.addEventListener("click", () => {
    animatedElement.animate(); 
})

function getRandomFigure() {
    figures = ["created-element-square", "created-element-circle", "created-element-triangle", "created-element-star", "created-element-heart", "created-element-moon", "d31"];
    let figure = figures[Math.floor(Math.random() * figures.length)];
    return figure;
}

function FigureAnimation(element) {
    this.element = element;
    this.animate = anime({
        targets: this.element,
        // background : bgcColorValue,
        duration: 3000,
        scale: [0.1, 2],
        rotate: 360,
        translateY: 100,
    })
}

btnCreate.addEventListener("click", () => {
    let createdElement = document.createElement('div');
    createdElement.style = "margin: 0 auto; margin-top: 10px";
    createdElement.className = getRandomFigure();
    btnCreate.after(createdElement);
    const createdElementAnimation = new FigureAnimation(createdElement);
    createdElementAnimation.animate();
})



 



