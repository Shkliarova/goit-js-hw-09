const e=document.querySelector(".form");function t(e,t){return new Promise(((o,n)=>{const l=Math.random()>.3;setTimeout((()=>{l?o({position:e,delay:t}):n({position:e,delay:t})}),t)}))}e.addEventListener("submit",(async function(o){o.preventDefault();let n=parseInt(e.querySelector('[name="delay"]').value);const l=parseInt(e.querySelector('[name="step"]').value),s=parseInt(e.querySelector('[name="amount"]').value);for(let e=1;e<=s;e++)t(e,n).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)})),n+=l}));
//# sourceMappingURL=03-promises.9c2ffe7b.js.map