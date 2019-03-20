<?php

/*
 Template Name: Find Your Vehicle
 */

 get_header();


 ?>
 <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,900italic,900,700italic,700,600italic,600,400italic,300italic,300" rel="stylesheet" type="text/css">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
 <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>

    <div class="main find-vehicle-page">
        <div class="container">
            <div class=" vehicle-form ">
                <?php the_title( '<h1 >', '</h1>' ); ?>
                <hr>
                <div class="row">
                    <div class="col-sm-6 col-md-4 col-lg-2">
                        <div class="form-group">
                            <label for="make">
                                Make
                            </label>
                            <select id="v-make" class="form-control" placeholder="Vehicle Make">                            
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4 col-lg-2" >
                        <div class="form-group">
                            <label for="model">
                                Model
                            </label>
                            <select id="v-model" class="form-control" placeholder="Vehicle Model">
                                <option disabled="" value="-1" selected="">No results</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4 col-lg-2">
                        <div class="form-group">
                            <label for="year">Year</label>
                            <select id="v-year" class="form-control" placeholder="Vehicle Year">
                                <option disabled="" value="-1"  selected="">No results</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4 col-lg-2">
                        <div class="form-group">
                            <label for="model">Fuel</label>
                            <select id="v-fuel" class="form-control" placeholder="Fuel"><option disabled=""  selected=""value="-1">No results</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4 col-lg-2">
                        <div class="form-group">
                            <label for="model">Engine Size</label>
                            <select id="v-engine" class="form-control" placeholder="Engine Size"><option disabled=""  selected="" value="-1">No results</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4 col-lg-1">
                        <div class="form-group">
                            <label for="model">HP</label>
                            <select id="v-hp" class="form-control" placeholder="Original HP"><option disabled=""   selected="" value="-1">No results</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4 col-lg-1">
                        <div class="form-group">
                            <label for="model">&nbsp;</label>
                            <button class="btn btn-block btn-primary" id="find-vehicle" disabled="disabled">Go</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="vehicle-all-info" >
                <div class="row">
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-8">
                        <h1 class="vehicle-title"></h1>
                    </div>
                </div>
                <hr>
                <div class="row clearfix info-row">

                    <div class="col-md-8">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Original</th>
                                        <th>Stage&nbsp;1</th>
                                        <th>Stage&nbsp;2</th>
                                        <th>Stage&nbsp;3</th>
                                        <th>Eco</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="trhp">
                                        <th>Horsepower</th>
                                        <td>
                                            <span></span>
                                            
                                        </td>
                                        <td>
                                            <span></span>
                                            
                                        </td>
                                        <td>
                                            
                                            <span>N/A</span></td>
                                        <td>
                                            
                                            <span>N/A</span></td>
                                        <td>
                                            
                                            <span>N/A</span></td>
                                    </tr>
                                    <tr class="trtq">
                                        <th>Torque</th>
                                        <td>
                                            <span></span>
                                            
                                        </td>
                                        <td>
                                            <span></span>
                                            
                                        </td>
                                        <td>
                                            
                                            <span>N/A</span></td>
                                        <td>
                                            
                                            <span>N/A</span></td>
                                        <td>
                                            
                                            <span>N/A</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-4 percentage-increases" style="padding-top:0;">
                        <h4>Potential Gains Include:</h4>
                        <div class="potential_gain">
                        <p class="alert alert-info">Up to <strong>14.86%</strong> Extra Power</p>
                        
                        <p class="alert alert-info">Up to <strong>8%</strong> Fuel Saving</p>
                        </div>
                    </div>

                </div>

                <div class="row clearfix chart-row align-items-start">

                    <div class="col-md-8 chart-wrapper">

                        <div style="display: block; width: 100%; position: relative;">
                            <canvas basechart="" height="0" id="graph" width="0"></canvas>
                        </div>
                        <label class="x-axis">RPM</label>
                        <label class="y-axis-l">HP</label>
                        <label class="y-axis-r">NM</label>
                    </div>
                    <div class="col-md-4">
                        <h4>Other Vehicle Details:</h4>
                        <div class="car-svg">
                            <!--template bindings={}-->
                        </div>
                        <dl class="car-info dl-horizontal">
                        </dl>
                    </div>

                </div>

                <div class="ecu-info ecu-row no-print">
                    <hr>
                    <h2 class="text-center">ECU Information</h2>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Availability</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                    </div>
                </div>
                
                <small>Data provided by this tool is free for personal use only. </small>
                <div class="duplicates alert alert-info other-vehicles">
                    <strong>There is more than one version of this vehicle in our database, please see details below:</strong>
                    <ul>
                        
                    </ul>
                </div>

                <div class="disclaimer">
                    <hr>

                    <p class="small"><strong>Disclaimer: </strong>
                    Please remember that every vehicle is unique; Manufacturers will sometimes put different ECUs into the same car, and many vehicles have unusual configurations or modifications which are only apparent when reading the ECU. As such, we recommend that you discuss the potential gains and tuning options available directly with your chosen tuning technician.</p>

                    <p class="small">Topgear Tuning is incredibly proud of the data it has developed over many years, both in-house and in conjunction with the world’s best tuning and modifications companies. The data is constantly being refined, amended, updated and expanded. Topgear Tuning is confident that its data is the most comprehensive ECU tuning and remapping data currently available anywhere in the world.</p>

                    <p class="small">Whilst every effort is made to ensure the data in above table is up-to-date and accurate, it should only be used as a guide. It is possible that the economy and performance gains available are in excess of those stated above, conversely actual gains may be less than the current data suggests.</p>
                </div>
            </div>
        </div>
    </div>
    <?php
     
    ?>

<script type="text/javascript">
        window.admin_ajax_url = "<?php echo admin_url('admin-ajax.php'); ?>";
    </script>
<script type="text/javascript" src="<?php echo get_theme_file_uri('vehicle/js/script.js'); ?>"></script>
<?php
 get_footer();

