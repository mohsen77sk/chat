(self.webpackChunkweb_app=self.webpackChunkweb_app||[]).push([[499],{4084:(x,d,o)=>{var l={"./i18n/en.json":[1949,949],"./i18n/fa.json":[6698,698]};function c(s){if(!o.o(l,s))return Promise.resolve().then(()=>{var p=new Error("Cannot find module '"+s+"'");throw p.code="MODULE_NOT_FOUND",p});var u=l[s],f=u[0];return o.e(u[1]).then(()=>o.t(f,19))}c.keys=()=>Object.keys(l),c.id=4084,x.exports=c},5499:(x,d,o)=>{"use strict";o.r(d),o.d(d,{AuthSignInModule:()=>M});var l=o(6814),c=o(4408),s=o(6223),u=o(617),f=o(2032),p=o(2296),g=o(4170),v=o(619),h=o(6560),y=o(4273),T=o(5120),C=o(6821),Z=o(7398),S=o(6306),n=o(9212),A=o(181);const N=["signInNgForm"];function Q(t,e){if(1&t&&(n.ynx(0),n._uU(1),n.BQk()),2&t){const i=e.$implicit;n.xp6(1),n.hij(" ",i("signIn.sign-in")," ")}}function F(t,e){if(1&t&&(n.ynx(0),n._uU(1),n.BQk()),2&t){const i=e.$implicit;n.xp6(1),n.hij(" ",i("signIn.do-not-have-an-account")," ")}}function U(t,e){if(1&t&&(n.ynx(0),n._uU(1),n.BQk()),2&t){const i=e.$implicit;n.xp6(1),n.hij(" ",i("signIn.sign-up")," ")}}function w(t,e){if(1&t&&(n.TgZ(0,"chat-alert",19),n._uU(1),n.qZA()),2&t){const i=n.oxw();n.Q6J("appearance","outline")("showIcon",!1)("type",i.alert.type)("@shake","error"===i.alert.type),n.xp6(1),n.hij(" ",i.alert.message," ")}}function j(t,e){if(1&t&&(n.ynx(0),n._uU(1),n.BQk()),2&t){const i=e.$implicit;n.xp6(1),n.hij(" ",i("signIn.username")," ")}}function J(t,e){if(1&t&&(n.ynx(0),n._uU(1),n.BQk()),2&t){const i=e.$implicit;n.xp6(1),n.hij(" ",i("required")," ")}}function Y(t,e){if(1&t&&(n.ynx(0),n._uU(1),n.BQk()),2&t){const i=e.$implicit;n.xp6(1),n.hij(" ",i("signIn.password")," ")}}function B(t,e){1&t&&(n.TgZ(0,"mat-icon",20),n._uU(1," visibility "),n.qZA())}function b(t,e){1&t&&(n.TgZ(0,"mat-icon",20),n._uU(1," visibility_off "),n.qZA())}function _(t,e){if(1&t&&(n.ynx(0),n._uU(1),n.BQk()),2&t){const i=e.$implicit;n.xp6(1),n.hij(" ",i("required")," ")}}function R(t,e){if(1&t&&(n.ynx(0),n._uU(1),n.BQk()),2&t){const i=e.$implicit;n.xp6(1),n.hij(" ",i("sign-in")," ")}}const $=()=>["/sign-up"],k=[{path:"",component:(()=>{class t{constructor(i,r,m,a){this._router=i,this._activatedRoute=r,this._formBuilder=m,this._authService=a,this.showAlert=!1,this.alert={type:"success",message:""}}ngOnInit(){this.signInForm=this._formBuilder.group({username:["",s.kI.required],password:["",s.kI.required]})}signIn(){this.signInForm.invalid||(this.signInForm.disable(),this.showAlert=!1,this._authService.signIn(this.signInForm.value).pipe((0,Z.U)(()=>{const i=this._activatedRoute.snapshot.queryParamMap.get("redirectURL")||"/signed-in-redirect";this._router.navigateByUrl(i)}),(0,S.K)(i=>{throw this.signInForm.enable(),this.signInNgForm.resetForm(),this.alert={type:"error",message:i.error.error},this.showAlert=!0,i})).subscribe())}static#n=this.\u0275fac=function(r){return new(r||t)(n.Y36(c.F0),n.Y36(c.gz),n.Y36(s.qu),n.Y36(C.e8))};static#t=this.\u0275cmp=n.Xpm({type:t,selectors:[["chat-sign-in"]],viewQuery:function(r,m){if(1&r&&n.Gf(N,5),2&r){let a;n.iGM(a=n.CRH())&&(m.signInNgForm=a.first)}},decls:32,vars:11,consts:[[1,"flex","min-w-0","flex-auto","flex-col","items-center","sm:justify-center"],[1,"sm:bg-card","w-full","px-4","py-8","sm:w-auto","sm:rounded-2xl","sm:p-12","sm:shadow"],[1,"max-w-80","mx-auto","w-full","sm:mx-0","sm:w-80"],[1,"text-4xl","font-extrabold","leading-tight","tracking-tight"],[4,"transloco"],[1,"mt-0.5","flex","items-baseline","font-medium"],[1,"text-primary-500","mx-1","hover:underline",3,"routerLink"],["class","-mb-4 mt-8",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],["signInNgForm","ngForm"],[1,"w-full"],["id","username","matInput","","formControlName","username"],[4,"transloco","translocoRead"],["id","password","matInput","","type","password","formControlName","password"],["passwordField",""],["matSuffix",""],["mat-icon-button","","type","button",3,"click"],["class","mat-icon-rtl-mirror icon-size-5",4,"ngIf"],["mat-flat-button","",1,"msk-mat-button-large","mt-6","w-full",3,"color","disabled","click"],[1,"-mb-4","mt-8",3,"appearance","showIcon","type"],[1,"mat-icon-rtl-mirror","icon-size-5"]],template:function(r,m){if(1&r){const a=n.EpF();n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),n.YNc(4,Q,2,1,"ng-container",4),n.qZA(),n.TgZ(5,"div",5)(6,"div"),n.YNc(7,F,2,1,"ng-container",4),n.qZA(),n.TgZ(8,"a",6),n.YNc(9,U,2,1,"ng-container",4),n.qZA()(),n.YNc(10,w,2,5,"chat-alert",7),n.TgZ(11,"form",8,9)(13,"mat-form-field",10)(14,"mat-label"),n.YNc(15,j,2,1,"ng-container",4),n.qZA(),n._UZ(16,"input",11),n.TgZ(17,"mat-error"),n.YNc(18,J,2,1,"ng-container",12),n.qZA()(),n.TgZ(19,"mat-form-field",10)(20,"mat-label"),n.YNc(21,Y,2,1,"ng-container",4),n.qZA(),n._UZ(22,"input",13,14),n.TgZ(24,"div",15)(25,"button",16),n.NdJ("click",function(){n.CHM(a);const I=n.MAs(23);return n.KtG(I.type="password"===I.type?"text":"password")}),n.YNc(26,B,2,0,"mat-icon",17)(27,b,2,0,"mat-icon",17),n.qZA()(),n.TgZ(28,"mat-error"),n.YNc(29,_,2,1,"ng-container",12),n.qZA()(),n.TgZ(30,"button",18),n.NdJ("click",function(){return m.signIn()}),n.YNc(31,R,2,1,"ng-container",12),n.qZA()()()()()}if(2&r){const a=n.MAs(23);n.xp6(8),n.Q6J("routerLink",n.DdM(10,$)),n.xp6(2),n.Q6J("ngIf",m.showAlert),n.xp6(1),n.Q6J("formGroup",m.signInForm),n.xp6(7),n.Q6J("translocoRead","error-validation"),n.xp6(8),n.Q6J("ngIf","password"===a.type),n.xp6(1),n.Q6J("ngIf","text"===a.type),n.xp6(2),n.Q6J("translocoRead","error-validation"),n.xp6(1),n.Q6J("color","primary")("disabled",m.signInForm.disabled),n.xp6(1),n.Q6J("translocoRead","signIn")}},dependencies:[l.O5,c.rH,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,u.Hw,f.Nt,g.KE,g.hX,g.TO,g.R9,p.lW,p.RK,A.$,h.KI],encapsulation:2,data:{animation:T.l}})}return t})()}];let M=(()=>{class t{static#n=this.\u0275fac=function(r){return new(r||t)};static#t=this.\u0275mod=n.oAB({type:t});static#i=this.\u0275inj=n.cJS({providers:[{provide:h.Hn,useValue:{scope:"signIn",loader:(0,y.Q)((i,r)=>o(4084)(`./${r}/${i}.json`))}}],imports:[l.ez,c.Bz.forChild(k),s.u5,s.UX,u.Ps,f.c,p.ot,g.lN,v.t0,h.y4]})}return t})()}}]);