getScaledColor: function(duration, formula) { formula = "linear"; let Dmax =
this.scaling.Dmax; let Dmin = this.scaling.Dmin; let mix = (duration - Dmin) /
(Dmax - Dmin); console.log(duration); console.log(Dmin); console.log(duration);
console.log(duration); let c1 = this.maxColor .slice(0, -1) .split("(")[1]
.split(",") .map((e) => parseInt(e) / 255); let c2 = this.minColor .slice(0, -1)
.split("(")[1] .split(",") .map((e) => parseInt(e) / 255); if (formula !==
"linear") { c1 = c1.map((e) => { if (e > 0.04045) { return Math.pow((e + 0.055)
/ 1.055, 2.4); } else { return e / 12.92; } }); c2 = c2.map((e) => { if (e >
0.04045) { return Math.pow((e + 0.055) / 1.055, 2.4); } else { return e / 12.92;
} }); } let r1 = []; c1.forEach((e, i) => { console.log(mix); r1.push(e * (1 -
mix) + c2[i] * mix); }); if (formula !== "linear") { r1 = r1.map((e) => { let j;
if (e > 0.0031308) { j = 1.055 * Math.pow(e, 1 / 2.4) - 0.055; } else { j = e *
12.92; } return Math.floor(j * 255); }); } console.log(`${c1}`);
console.log(`${c2}`); console.log(`rgb(${r1})`); return `rgb(${r1})`; },
