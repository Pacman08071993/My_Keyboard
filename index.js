const keyboardEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BackSpace', 'Tab', 'q','w','e','r','t','y','u','i','o','p','[', ']',`\\`,'CapsLock','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter','Shift','z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', 'Space']

const keyboardEngUp = ['~','!', '@', '#', '$' , '%', '^', '&', '*', '(', ')', '_', '+' , 'BackSpace',  'Tab', 'Q','W','E','R','T','Y','U','I','O','P','{', '}',`|`,'CapsLock','A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter','Shift','Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift', 'Space']

const keyboardBlock = document.querySelector('.wrapper_body-keyboard')
const keyboardBlockInner = document.querySelector('.wrapper_body-keyboard-inner')
const body = document.body

const metaKey = {
    BackSpace : function() {
        const activeElem = document.activeElement
        const caretPos = activeElem.selectionStart = activeElem.selectionEnd 
       
        if(caretPos === 0) return
        
        activeElem.value = activeElem.value.slice(0,caretPos - 1) + activeElem.value.slice(caretPos)
        activeElem.selectionStart = activeElem.selectionEnd = caretPos - 1;
    } ,
    Tab : function() {
        const activeElem = document.activeElement
        const caretPos = activeElem.selectionStart = activeElem.selectionEnd

        activeElem.value = activeElem.value.slice(0,caretPos) + "    " + activeElem.value.slice(caretPos)
        activeElem.selectionStart = activeElem.selectionEnd = caretPos + 4
    },
    Enter : function() {
        const activeElem = document.activeElement
        const caretPos = activeElem.selectionStart = activeElem.selectionEnd

        activeElem.value = activeElem.value.slice(0,caretPos) + '\n' + activeElem.value.slice(caretPos);
        activeElem.selectionStart = activeElem.selectionEnd = activeElem.value.indexOf('\n',caretPos + 1)
    },
    Space : function() {
        const activeElem = document.activeElement
        const caretPos = activeElem.selectionStart = activeElem.selectionEnd

        activeElem.value = activeElem.value.slice(0,caretPos) + " " + activeElem.value.slice(caretPos)
    },
    CapsLock : function() {
        const divCheckboxCaps = document.querySelector('.checkbox-CapsLock')
        const checkboxCaps = document.querySelector('#CapsLock')
        const btns = document.querySelectorAll('.button')

        checkboxCaps.checked = checkboxCaps.checked? false : true

        btns.forEach((item) => {
            if(item.textContent in metaKey) return

            if(checkboxCaps.checked) {
                item.textContent = item.textContent.toUpperCase()
                divCheckboxCaps.style.background = '#64f5ee'

                return
            }

            divCheckboxCaps.style.background = 'white'
            item.textContent = item.textContent.toLowerCase()
        })
    },
    Shift : function() {
        const divCheckboxShift = document.querySelectorAll('.checkbox-Shift')
        const checkboxShift = document.querySelector('#Shift')
        const btns = document.querySelectorAll('.button')

        checkboxShift.checked = checkboxShift.checked? false : true
        
        btns.forEach((item,index) => {
            if(item.textContent in metaKey) return
            
            if(checkboxShift.checked){
                item.textContent = keyboardEngUp[index]
                divCheckboxShift.forEach(item => item.style.background = '#64f5ee')

                return
            }

            item.textContent = keyboardEng[index]
            divCheckboxShift.forEach(item => item.style.background = 'white')
        })
    },
}

function keyPress(target) {
    if(target.textContent in metaKey) {
        metaKey[target.textContent]()

        return
    }
    
    const checkboxShift = document.querySelector('#Shift')
    const activeElem = document.activeElement
    const caretPos = activeElem.selectionStart = activeElem.selectionEnd
    
    activeElem.value = activeElem.value.slice(0,caretPos) + target.textContent + activeElem.value.slice(caretPos)
    activeElem.selectionStart = activeElem.selectionEnd = caretPos + 1

    if(checkboxShift.checked ) metaKey.Shift()
}

function init(layout = keyboardEng) {
    for(let i = 0; i < layout.length; i++) {
        const btn = document.createElement('button')
        
        btn.classList.add('button')
        btn.append(layout[i])
        
        if(layout[i] in metaKey){
            btn.classList.add(`button-${layout[i]}`)
            btn.insertAdjacentHTML('beforeend',
            `<div class='checkbox checkbox-${layout[i]}'><input id='${layout[i]}' type='checkbox'></div>`
            )  
        }
        
        keyboardBlockInner.append(btn)
        
        if(i === 13 || i === 27 || i === 40 || i === 52) { 
            let div = document.createElement('div')

            div.style.width = '100%'
            keyboardBlockInner.append(div) 
        }
    }
}

function focusField({target}) {
    if(target.tagName !== 'TEXTAREA' && target.tagName !== 'INPUT') return
    
    keyboardBlock.style.cssText = 'bottom : 10px; transition : 0.2s' 
    keyboardBlock.addEventListener('mousedown', write) 
}

function focusOutField() {
    keyboardBlock.style.cssText = 'bottom : -10000px; transition : 0.2s'
}

function write(e) {
    e.preventDefault()
    const{target} = e
    
    if(!target.classList.contains('button')) return

    keyPress(target)
}

window.addEventListener('load',() => {
    init()
    body.addEventListener('focusin',focusField)
    body.addEventListener('focusout',focusOutField)
})

