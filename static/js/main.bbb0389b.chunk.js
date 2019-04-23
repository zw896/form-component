(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,a,t){e.exports=t(41)},40:function(e,a,t){},41:function(e,a,t){"use strict";t.r(a);var n=t(0),i=t.n(n),r=t(4),s=t.n(r),d=t(5),o=t(3),l=t(14),c=t(15),u=t(21),m=t(16),p=t(6),b=t(22),h={id:"bmi",observationName:"BMI - Body mass index",dataElements:[{id:"name",displayName:"Name",type:"textInput",display:!0,isRequired:!0},{id:"gender",displayName:"Gender",type:"select",options:[{id:1,name:"Male",isDefault:!0,sortOrder:1},{id:2,name:"Female",isDefault:!1,sortOrder:2}],display:!0,isRequired:!1},{id:"weight",displayName:"Weight",unitOfMeasure:"kg",type:"numberInput",bounds:{upperLimit:1e3},display:!0,isRequired:!0},{id:"height",displayName:"Height",unitOfMeasure:"cm",type:"numberInput",bounds:{upperLimit:300},display:!0,isRequired:!0},{id:"bmi",displayName:"BMI",unitOfMeasure:"kg/m2",type:"numberInput",bounds:{upperLimit:100},display:!1,isRequired:!1}]},f={id:"head-circumference",observationName:"Head Circumference",dataElements:[{id:"name",displayName:"Name",type:"textInput",display:!0,isRequired:!0},{id:"gender",displayName:"Gender",type:"select",options:[{id:1,name:"Male",isDefault:!0,sortOrder:1},{id:2,name:"Female",isDefault:!1,sortOrder:2}],display:!0,isRequired:!1},{id:"head-circumference",displayName:"Head Circumference",unitOfMeasure:"cm",type:"numberInput",bounds:{upperLimit:1e3},display:!0,isRequired:!0}]},y=t(23),g=function(e){var a=null;switch(e.type){case"textInput":case"numberInput":a=i.a.createElement("input",{className:e.type,type:e.type,name:e.name,value:e.value,placeholder:e.placeholder,onChange:e.onChange});break;case"select":a=i.a.createElement(y.a,{className:e.type,defaultValue:e.default,options:e.options,onChange:e.onSelectChange,theme:function(e){return Object(o.a)({},e,{borderRadius:0,colors:Object(o.a)({},e.colors,{primary25:"hotpink",primary:"black"})})}});break;default:return null}return i.a.createElement("div",{className:"form-input"},a)},v=(t(40),function(e){function a(e){var t;Object(l.a)(this,a),(t=Object(u.a)(this,Object(m.a)(a).call(this,e))).handleChange=function(e){t.setState({data:Object(o.a)({},t.state.data,Object(d.a)({},e.target.name,e.target.value))}),console.log(t.state.data)},t.handleSelectChange=function(e,a){t.setState({data:Object(o.a)({},t.state.data,Object(d.a)({},a,e.value))})},t.validateForm=function(e){var a={};return t.state.dataElements.forEach(function(t){if(t.isRequired&&!e[t.id]&&(a[t.id]="".concat(t.displayName," can't be blank.")),"name"===t.id&&e[t.id]){e[t.id].match(/^([a-zA-Z]+\s){1}[a-zA-Z]+$/)||(a[t.id]="Name should be text based and separated by a space.")}if(t.bounds&&"bmi"!==t.id){(!e[t.id].match(/[0-9]\S+$/)||e[t.id]>t.bounds.upperLimit)&&(a[t.id]="".concat(t.id," should be numbers and less than ").concat(t.bounds.upperLimit))}if("bmi"===t.id){var n=e;n.bmi=n.weight/Math.pow(n.height/100,2)}}),t.setState({errors:a}),0===Object.keys(a).length},t.switchForm=function(e){var a="bmi"===e?f:h,n=a.id,i=a.dataElements,r=a.observationName,s=i.map(function(e){return e.id}).reduce(function(e,a){return Object(o.a)({},e,Object(d.a)({},a,""))},{});t.setState({isLoading:!0,id:n||null,observationName:r||null,dataElements:i,data:s,errors:{}})},t.onSubmit=function(e){e.preventDefault(),t.validateForm(t.state.data)&&console.log(t.state.data)};var n=h.id,i=h.dataElements,r=h.observationName,s=i.map(function(e){return e.id}).reduce(function(e,a){return Object(o.a)({},e,Object(d.a)({},a,""))},{});return t.state={isLoading:!0,id:n||null,observationName:r||null,dataElements:i,data:s,errors:{}},t.onChange=t.handleChange.bind(Object(p.a)(t)),t.onSelectChange=t.handleSelectChange.bind(Object(p.a)(t)),t}return Object(b.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e,a=this,t=this.state,n=t.id,r=t.observationName,s=t.dataElements,d=t.data,o=t.errors,l="";return i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"form-switch"},i.a.createElement("button",{className:"switch",onClick:function(){return a.switchForm("".concat(n))}},"switch")),i.a.createElement("form",{className:"form-field",onSubmit:this.onSubmit},i.a.createElement("h1",{id:"message"},r),s.map(function(t){return t.display?("select"===t.type&&(e=t.options.map(function(e){return e.isDefault&&(l=e.name),{value:e.id,label:e.name}})),i.a.createElement("div",{className:"form-input",key:t.id},i.a.createElement("h3",null,"".concat(t.displayName," ").concat(t.unitOfMeasure?" (".concat(t.unitOfMeasure,")"):"")),i.a.createElement(g,{type:t.type,name:t.id,bounds:t.bounds,options:e,placeholder:t.displayName,value:d[t.id],default:l,onChange:a.handleChange,onSelectChange:function(e){return a.handleSelectChange(e,t.id)}}),i.a.createElement("div",{className:"error"},o[t.id]))):null}),i.a.createElement("div",{className:"form-group"},i.a.createElement("button",{className:"submit",type:"submit"},"submit"))))}}]),a}(n.Component));var N=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(v,{className:"form-wrap",title:"Dynamic Form"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[24,1,2]]]);
//# sourceMappingURL=main.bbb0389b.chunk.js.map