
function rgba(colour, alpha) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatLineColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.4),
        borderColor: rgba(colors, 1),
        pointBackgroundColor: rgba(colors, 1),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: rgba(colors, 0.8)
    };
}
function formatBarColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.6),
        borderColor: rgba(colors, 1),
        hoverBackgroundColor: rgba(colors, 0.8),
        hoverBorderColor: rgba(colors, 1)
    };
}
function formatPieColors(colors) {
    return {
        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
        borderColor: colors.map(function () { return '#fff'; }),
        pointBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
        pointBorderColor: colors.map(function () { return '#fff'; }),
        pointHoverBackgroundColor: colors.map(function (color) { return rgba(color, 1); }),
        pointHoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
    };
}
function formatPolarAreaColors(colors) {
    return {
        backgroundColor: colors.map(function (color) { return rgba(color, 0.6); }),
        borderColor: colors.map(function (color) { return rgba(color, 1); }),
        hoverBackgroundColor: colors.map(function (color) { return rgba(color, 0.8); }),
        hoverBorderColor: colors.map(function (color) { return rgba(color, 1); })
    };
}
function getRandomColor() {
    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}
/**
 * Generate colors for line|bar charts
 * @param index
 * @returns {number[]|Color}
 */
function generateColor(index) {
    return BaseChartDirective.defaultColors[index] || getRandomColor();
}
/**
 * Generate colors for pie|doughnut charts
 * @param count
 * @returns {Colors}
 */
function generateColors(count) {
    var colorsArr = new Array(count);
    for (var i = 0; i < count; i++) {
        colorsArr[i] = BaseChartDirective.defaultColors[i] || getRandomColor();
    }
    return colorsArr;
}
/**
 * Generate colors by chart type
 * @param chartType
 * @param index
 * @param count
 * @returns {Color}
 */
function getColors(chartType, index, count) {
    if (chartType === 'pie' || chartType === 'doughnut') {
        return formatPieColors(generateColors(count));
    }
    if (chartType === 'polarArea') {
        return formatPolarAreaColors(generateColors(count));
    }
    if (chartType === 'line' || chartType === 'radar') {
        return formatLineColor(generateColor(index));
    }
    if (chartType === 'bar' || chartType === 'horizontalBar') {
        return formatBarColor(generateColor(index));
    }
    return generateColor(index);
}

var BaseChartDirective = {
    labels: [],
    options: {},
    chart: null,
    getChartBuilder: function(ctx ) {
        var _this = this;
        var datasets = _this.getDatasets();
        var options = this.options;
        if (this.legend === false) {
            options.legend = { display: false };
        }

        var opts = {
            type: this.chartType,
            data: {
                labels: this.labels,
                datasets: datasets
            },
            options: options
        };
        
        return new Chart(ctx, opts);
    },
    chartType: "line",
    getDatasets: function () {
        var _this = this;
        var datasets = void 0;
        // in case if datasets is not provided, but data is present
        if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
            if (Array.isArray(this.data[0])) {
                datasets = this.data.map(function (data, index) {
                    return { data: data, label: _this.labels[index] || "Label " + index };
                });
            }
            else {
                datasets = [{ data: this.data, label: "Label 0" }];
            }
        }
        if (this.datasets && this.datasets.length ||
            (datasets && datasets.length)) {
            datasets = (this.datasets || datasets)
                .map(function (elm, index) {
                var newElm = jQuery.extend({}, elm);
                if (_this.colors && _this.colors.length) {
                    newElm = jQuery.extend({}, newElm, _this.colors[index]);
                }
                else {
                    newElm = jQuery.extend({},  newElm, getColors(_this.chartType, index, newElm.data.length));
                }
                return newElm;
            });
        }       
        return datasets;
    }, 
    refresh: function() {
        this.chart = this.getChartBuilder(this.ctx /*, data, this.options*/);
    },
    update: function(data) {
        this.datasets = [
            {data: data.newHPChartData, label: 'New HP'},
			{data: data.newNMChartData, label: 'New NM'},
			{data: data.HPChartData, label: 'HP'},
			{data: data.NMChartData, label: 'NM'}
        ];

        this.chart.data.datasets = this.getDatasets();
        this.chart.data.labels = this.labels;
        this.chart.update();        
    },
    colors: [],
    defaultColors: [
        [255, 99, 132],
        [54, 162, 235],
        [255, 206, 86],
        [231, 233, 237],
        [75, 192, 192],
        [151, 187, 205],
        [220, 220, 220],
        [247, 70, 74],
        [70, 191, 189],
        [253, 180, 92],
        [148, 159, 177],
        [77, 83, 96]
    ],
    lineChartData: [
	],

	lineChartLabels: [0, 1000, 2000, 3000, 4000, 5000],

	lineChartOptions: {
		animation: {
			duration: 500,
			easing: 'easeInCubic'
		},
		scales: { 
			yAxes: [{
				ticks: {
					fontColor: "#aaa",
					backgroundColor: '#000000'
				},
				gridLines: {
					color: "#21354a",
					zeroLineColor: "#21354a"
				}
			}],
			xAxes: [{
				ticks: {
					fontColor: "#aaa",
					backgroundColor: '#000000'
				},
				gridLines: {
					color: "#21354a",
					zeroLineColor: "#21354a"
				}
			}]
		},
		defaultFontColor : "#fff",
		defaultFontSize : 16,
		defaultFontFamily : 'Nunito Sans',
		responsive: true
	},

	lineChartColors: [
		{ // blue
			backgroundColor: 'rgba(16,167,243,0)',
			borderColor: 'rgba(16,167,243,1)',
			pointBackgroundColor: 'transparent',
			pointBorderColor: 'transparent',
			pointHoverBackgroundColor: 'transparent',
			pointHoverBorderColor: 'transparent'
		},
		{ // purple
			backgroundColor: 'rgba(242,17,167,0)',
			borderColor: 'rgba(242,17,167,1)',
			pointBackgroundColor: 'transparent',
			pointBorderColor: 'transparent',
			pointHoverBackgroundColor: 'transparent',
			pointHoverBorderColor: 'transparent'
		},
		{ // blue faded
			backgroundColor: 'rgba(16,167,243,0)',
			borderColor: 'rgba(16,167,243,.33)',
			pointBackgroundColor: 'transparent',
			pointBorderColor: 'transparent',
			pointHoverBackgroundColor: 'transparent',
			pointHoverBorderColor: 'transparent'
		},
		{ // purple faded
			backgroundColor: 'rgba(242,17,167,0)',
			borderColor: 'rgba(242,17,167,.33)',
			pointBackgroundColor: 'transparent',
			pointBorderColor: 'transparent',
			pointHoverBackgroundColor: 'transparent',
			pointHoverBorderColor: 'transparent'
		}
	],

	lineChartLegend: false,

	lineChartType: 'line',

	updateGraph: function() {
		
    },
    
    Vehicle: [],

    init: function(data) {
        this.lineChartData = [
			{data: [0, 3, 12, 23, 25, 24], label: 'New HP'},
			{data: [16, 26, 48, 50, 41, 32], label: 'New NM'},
			{data: [0, 3, 12, 23, 25, 24], label: 'HP'},
			{data: [16, 26, 48, 50, 41, 32], label: 'NM'}
		];

		var chart = document.getElementById('graph');
        chart.style.height='400px';
        this.ctx = chart.getContext('2d');
        this.datasets = this.lineChartData;
        this.labels = this.lineChartLabels;
        this.options = this.lineChartOptions;
        this.colors = this.lineChartColors;
        this.legend = false;
        this.refresh();

        //this.updateGraph();

    },
    
    ctx : null,
};

   

    var makesUrl = '//www.ecu-data.net/vehicle/makes';
	var modelsUrl = '//www.ecu-data.net/vehicle/models';
	var versionsUrl = '//www.ecu-data.net/vehicle/versions';
	var ccsUrl = '//www.ecu-data.net/vehicle/ccs';
	var hpsUrl = '//www.ecu-data.net/vehicle/hps';
	var yearsUrl = '//www.ecu-data.net/vehicle/years';
	var fuelsUrl = '//www.ecu-data.net/vehicle/fuels';
	var vehicleUrl = '//www.ecu-data.net/vehicle';
	var vrmUrl = '//www.ecu-data.net/vehicle';

    var vehicle_data_param = {
        make: "",
        model: "",
        year: "",
        fuel: "",
        CC: "",
        HP: "",
    };

    jQuery('document').ready(function(e) {
        jQuery.ajax({
        type: "GET",
        url: makesUrl,
        success: function(data) {
            //data = JSON.parse(data);
            $sel = jQuery("#v-make");
            $sel.append("<option disabled='' selected='' value='0'>Please select a make</option>");
            jQuery.each(data, function(key, value) {
                var $option = $("<option/>", {
                    value: value.make,
                    text: value.make
                });
                $sel.append($option);
            });
        }
    });

        var get_datas = function( $sel, url, type) {
            jQuery.ajax({
                type:"POST",
                url: url,
                data:vehicle_data_param,
                success: function(data) {
                    //$sel = jQuery("#v-model");
                    var option = type == "CC" ? "Engine" : type;
                    $sel.html('<option disabled selected="selected" value="0">' + option + '</option>');
                    if (data.length == 0) return;
                    jQuery.each(data, function(key, value) {
                    var $option = $("<option/>", {
                        value: value[type],
                        text: value[type]
                    });
                    $sel.append($option);
                    });

                    if (type == "HP" && data.length == 1) {
                        $sel.val(data[0][type]);
                        jQuery("#find-vehicle").removeAttr("disabled");
                    }
                }
            })
        };

        jQuery("#v-make").off('change').on("change", function(e) {
            vehicle_data_param.make = jQuery(this).val();
            get_datas(jQuery("#v-model"), modelsUrl, "model");
        });

        jQuery("#v-model").off("change").on("change", function(e) {
            vehicle_data_param.model = jQuery(this).val();
            get_datas(jQuery("#v-year"), yearsUrl, "year");
        });

        jQuery("#v-year").off("change").on("change", function(e) {
            vehicle_data_param.year = jQuery("#v-year").val();

            get_datas(jQuery("#v-fuel"), fuelsUrl, "fuel");
        });

        jQuery("#v-fuel").off("change").on("change", function(e) {
            vehicle_data_param.fuel = jQuery("#v-fuel").val();
            get_datas(jQuery("#v-engine"), ccsUrl, "CC");
        });

        jQuery("#v-engine").off("change").on("change", function(e) {
            vehicle_data_param.CC = jQuery("#v-engine").val();
            get_datas( jQuery("#v-hp"), hpsUrl, "HP");
        });

        jQuery("#v-hp").off("change").on("change", function(e) {
            vehicle_data_param.HP = jQuery("#v-hp").val();
            jQuery("#find-vehicle").removeAttr("disabled");
        });

        jQuery("#find-vehicle").off('click').on('click', function(e) {
            
            vehicle_data_param.HP = jQuery("#v-hp").val();
            jQuery(".vehicle-title").html(jQuery("#v-make").val() + " " + jQuery("#v-model").val() + " " 
                + jQuery("#v-year").val() + " "
                + jQuery("#v-fuel").val() + " "
                + jQuery("#v-engine").val() + " "
                + jQuery("#v-hp").val() + "HP");
                getVehicle();   
        });

        var getVehicle = function() {
            vehicle_data_param.action = "get_vehicle";
            var data = jQuery.extend({}, vehicle_data_param, {"action": "get_vehicle"});
            jQuery.ajax({
                type:"POST",
                url: admin_ajax_url,
                data:data,
                success: function(data) {

                    data = JSON.parse(data);                    
                    BaseChartDirective.update(data);
                    updateVehicleInfo(data);
                    jQuery(".vehicle-all-info").show();
                }
            });
        };

        var getVehicleByVRM = function(vrm) {
            jQuery.ajax({
                type:"POST",
                url: vrmUrl,
                data:{
                    vrm: vrm
                },
                success: function(data) {
                    //$sel = jQuery("#v-model");
                    console.log(data);
                }
            });
        };

        var getVehicleByID = function (vid) {
            jQuery.ajax({
                type:"POST",
                url: vrmUrl,
                data:{
                    vehicle_id: vid
                },
                success: function(data) {
                    //$sel = jQuery("#v-model");
                    console.log(data);
                }
            });
        }

        BaseChartDirective.init();

        var updateVehicleInfo = function(data) {
            //tabe
            jQuery(".trhp").find("td > span").text("N/A");
            data.originalHP > 0 ? jQuery(".trhp td:eq(0) > span").text(data.originalHP) : '';
            data.stage1HP > 0 ? jQuery(".trhp td:eq(1) > span").text(data.stage1HP) : '';
            data.stage2HP > 0 ? jQuery(".trhp td:eq(2) > span").text(data.stage2HP) : '';
            data.stage3HP > 0 ? jQuery(".trhp td:eq(3) > span").text(data.stage3HP) : '';
            data.ecoHP > 0 ? jQuery(".trhp td:eq(4) > span").text(data.ecoHP) : '';

            jQuery(".trtq").find("td > span").text("N/A");
            data.originalNM > 0 ? jQuery(".trtq td:eq(0) > span").text(data.originalNM) : '';
            data.stage1NM > 0 ? jQuery(".trtq td:eq(1) > span").text(data.stage1NM) : '';
            data.stage2NM > 0 ? jQuery(".trtq td:eq(2) > span").text(data.stage2NM) : '';
            data.stage3NM > 0 ? jQuery(".trtq td:eq(3) > span").text(data.stage3NM) : '';
            data.ecoNM > 0 ? jQuery(".trtq td:eq(4) > span").text(data.ecoNM) : '';

            jQuery(".potential_gain").html("");
            data.extraPower != "" ? jQuery(".potential_gain").append('<p class="alert alert-info">Up to <strong>'  + data.extraPower + ' </strong> Extra Power</p>') : '';
            data.fuelSaving != "" ? jQuery(".potential_gain").append('<p class="alert alert-info">Up to <strong>'  + data.fuelSaving + '% </strong>  Fuel Saving</p>') : '';

            data.image != "" ? jQuery(".car-svg").html("<img src='https://www.ecu-data.net/public/dist/images/" + data.image + "' />") : '';
            jQuery(".car-info").html("");
            data.modelType != "" ? jQuery(".car-info").append("<dt>Model Type</dt><dd>" + data.modelType +"</dd>") : '';
            data.CC != "" ? jQuery(".car-info").append("<dt>Cylinder Capacity</dt><dd>" + data.CC +"</dd>") : '';
            data.engineCode != "" ? jQuery(".car-info").append("<dt>Engine Code</dt><dd>" + data.engineCode +"</dd>") : '';
            data.fuel != "" ? jQuery(".car-info").append("<dt>Fuel Type</dt><dd>" + data.fuel +"</dd>") : '';
            data.KW != "" ? jQuery(".car-info").append("<dt>Original KW</dt><dd>" + data.KW +"</dd>") : '';
            data.PS != "" ? jQuery(".car-info").append("<dt>Original PS</dt><dd>" + data.PS +"</dd>") : '';
            data.originalHP != "" ? jQuery(".car-info").append("<dt>Original HP</dt><dd>" + data.originalHP +"</dd>") : '';

            var ecu = jQuery(".ecu-info tbody"); 
            ecu.html("");
            data.dpfOff == "1"  ? ecu.append('<tr class="service-row"><th>DPF Off</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">Whilst removal of the Diesel Particulate Filter (DPF) is possible on many vehicles</p><span class="read-more-target"> it is currently prohibited by UK law and is not recomended by our team. Topgear Tuning will not perform any DPF removal regardless of the vehicle, location or intended use. Please contact us for more information.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";

            data.egrOff == "1"  ? ecu.append('<tr class="service-row"><th>EGR Off</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">Exhaust gas recirculation (EGR) is a nitrogen oxide (NOx) emissions reduction technique</p><span class="read-more-target"> used in petrol/gasoline and diesel engines. EGR works by re circulating a portion of an engine’s exhaust gas back to the engine cylinders. This dilutes the O2 within the incoming air stream and provides gases, inert to combustion, to act as absorbents of combustion heat in order to reduce peak in-cylinder temperatures. NOx is produced in a narrow band of high cylinder temperatures and pressures. However, the valves can become clogged with carbon deposits, causing them to fail or stick, thereby causing error codes and the vehicle to not run correctly. Our solution is a simple and effective method of improving the efficiency. Topgear Tuning’s software disables the EGR valve, and results in lowered engine temperatures, improved throttle response and better economy.  It can also increase engine life by reducing oil contamination and carbon deposits.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";

            data.o2Off == "1"  ? ecu.append('<tr class="service-row"><th>O2 Off</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">O2 Delete remaps are for those who have fitted either sports­cats or de­cat pipes within</p><span class="read-more-target">their exhaust system and are subsequently having problems with the engine light being triggered due to emissions faults for error codes P0420 and P0430 (Cat efficiency). We can solve this problem by disabling these checks within the ECU map.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";

            data.launchPatch  == "1" ? ecu.append('<tr class="service-row"><th>Launch Patch</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">Topgear Tuning’s Launch control Software manages the amount of power to the wheels optimum</p><span class="read-more-target"> traction is achieved. From 2-4 MPH the RPM is limited to 2500-2750rpm. Once the pre-determined speed is reached the RPM Limiter will automatically move to normal RPM and from that point maximum power is allowed.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";
            
            data.hardCutLimiter  == "1" ? ecu.append('<tr class="service-row"><th>Hard Cut Limiter</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">Our Hard Cut Limiter programs the ECU to cut fuelling at a set RPM (normally 4300rpm</p><span class="read-more-target"> making the revs bounce off the limiter! This is normally available for cars from VAG Group but we can consider other vehicles once we analyse relevant diagnostic data.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";

            data.adblue == "1"  ? ecu.append('<tr class="service-row"><th>Adblue</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">AdBlue is used in a process called selective catalytic reduction (SCR) to reduce emissions</p><span class="read-more-target"> of nitrogen from the exhaust of diesel engines but it has been known to produce very high operating costs.  If you wish to reduce or completely eliminate the consumption of AdBlue in your truck we can reprogram the ECU to allow this. Our procedure will not illuminate dashboard error lights. Note: Removal of the AdBlue system (or similar) should only be carried out on trucks for off road or racing use. Using a vehicle on public roads with such a system disabled is at the owner/operators risk. If you have any questions please get in touch with your nearest Topgear Tuning centre – with over 270, we have one near you.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";

            data.mafRemoval == "1"  ? ecu.append('<tr class="service-row"><th>MAF Removal</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">MAF deactivation is not recommended as it is a very important sensor for fuel regulation</p><span class="read-more-target">  but sometimes (normally on high powered tuned cars with bigger turbo/injector modifications) the MAF reading hits its maximum value and touches the maximum allowed voltage read by the sensor making a fault code in the ECU and places the vehicle into a safe mode (limp mode). On vehicles so equipped, this alternative involves the use of a manifold absolute pressure, or MAP, sensor. The MAP sensor measures pressure in an engine’s inlet manifold. When coupled with RPM data, and a table of volumetric efficiency over the operating range of the engine, the MAP sensor can be used by the engine management computer to calculate fuel requirements.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";

            data.swirlFlapsRemoval == "1"  ? ecu.append('<tr class="service-row"><th>Swirl Flaps Removal</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">Intake manifold flap failures are common on certain groups of cars and are expensive</p><span class="read-more-target"> to replace. Our software can be used as part of a flap removal operation without causing fault codes or engine management lights.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";

            data.startStopDisable == "1"  ? ecu.append('<tr class="service-row"><th>Start Stop Disable</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">Many people do not like modern Start/Stop systems (which turns off the engine every</p><span class="read-more-target"> but it’s becoming increasingly common on new vehicles. Normally, there is a disable button, but this has to be re­set every ­time the engine is restarted. With our Start/Stop Disable ECU remap, the function is disabled permanently.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";

            data.tva == "1"  ? ecu.append('<tr class="service-row"><th>TVA</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">Throttle valve actuators regulate the air or mixture supply for the</p><span class="read-more-target"> combustion engine. Depending on the engine concept, this serves different purposes. In the case of petrol engines, speed and power output are regulated by means of fresh air or mixture dosing. Diesel engines generally do not need a throttle valve. However, in modern diesel cars, throttling the amount of intake air facilitates precision control for exhaust gas re-circulation and stops the engine from shaking when the ignition is switched off. The TVA is often linked to many problems by our costumers. We now allow TVA to be fully removed and will remove any problem (if presented any) from the ECU.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): ""; 
            
            data.DSG == "1" ? ecu.append('<tr class="service-row"><th>DSG</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">Modern DSG automatic gearboxes use a pair of clutches in place of a single unit to help you change gear faster</p><span class="read-more-target">than a traditional manual or automatic alternative. Cars with DSG gearboxes don’t feature a clutch pedal and are controlled in exactly the same way as a conventional automatic. Topgear Tuning can adjust the response on your cars DSG to provide faster gear changes and smoother feedback.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";

            data.ImmoOff == "1"  ? ecu.append('<tr class="service-row"><th>Immobiliser Off</th><td><img src="//www.ecu-data.net/public/dist/images/tick.png"></td><td><p class="read-more-wrap">An immobiliser is an electronic security device which stops a vehicle from being started</p><span class="read-more-target">unless the correct digital key or token is present.  Topgear Tuning are able, at request, to remove your vehicle\'s ECU\'s reliance on communication with an Immobiliser.</span><label class="read-more-trigger" for="post-8"></label></td></tr>'): "";

            var others = jQuery(".other-vehicles ul");
            others.html('');
            if (data.otherMatches.length > 0 ) {
                jQuery.each(data.otherMatches, function(e, item) {
                    others.append('<li><div>' + item.ecuVersion + '</div></li>')
                });
            }

            jQuery('.ecu-info .service-row').off("click").on("click", function(e) {
                jQuery(this).toggleClass("service-more");
            });
        }
    });
   