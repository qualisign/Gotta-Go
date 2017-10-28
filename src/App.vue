<template>
    <div id="app" >
        <div class="sidebar" style="background: #B4DDDD">
            <el-row :gutter="24">
            <el-col :span="16">
                <span style="height: 50%; width: 50%"><img src="../static/SchuhLogo.svg"></img></span>
            </el-col>
            <el-col :span="8">
                <span style="text-align: left"><h1>Gotta<br>Go!</h1></span>
            </el-col>
            </el-row>
            <div class="finder">
                <div>                   
                    <el-form-item label="Location">
                        <el-input placeholder="find your restroom"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="filters" style="padding: 20px">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="Distance">
                        <el-slider v-model="form.distance"></el-slider>
                    </el-form-item>
                    <el-form-item label="Rating">
                        <el-rate void-color="white" v-model="form.rating"></el-rate>
                    </el-form-item>
                    <el-form-item label="Pay?">
                        <el-switch
                            v-model="form.payBool"
                            active-text="pay toilets"
                            inactive-text="only free toilets">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="Who's allowed?">
                        <el-checkbox-group v-model="form.gender">
                            <span v-for="gender in genders"><el-checkbox :label="gender.title" style="padding-left: 3px; padding-right: 3px"></el-checkbox><icon  style="padding-left: 3px; padding-right: 6px":name="gender.icon"></icon></span>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="Special needs?">
                        
                        <el-checkbox-group v-model="form.specials">
                            <span v-for="special in specials"><el-checkbox :label="special.title" style="padding-left: 3px; padding-right: 3px"></el-checkbox><icon style="padding-left: 3px; padding-right: 3px" :name="special.icon"></icon></span>              
                        </el-checkbox-group>
                        
                    </el-form-item>
                    
                </el-form>
            </div>            
        </div>
        <div class="results" >
            <el-tabs type="card">
                <el-tab-pane label="Map">
                    <div style="height: 100%" class="map-container">
                    <v-map class="mini-map" :zoom=13 :center="[47.413220, -1.219482]" :style="{height: '1000px'}">
                        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                        <v-marker :lat-lng="[47.413220, -1.219482]"></v-marker>
                    </v-map>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Config">Config</el-tab-pane>
                <el-tab-pane label="Role">Role</el-tab-pane>
                <el-tab-pane label="Task">Task</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
 import HelloWorld from './components/HelloWorld'
 import Icon from 'vue-awesome/components/Icon'
 import L from 'leaflet'
 import Vue2Leaflet from 'vue2-leaflet'

 
 export default {
     name: 'app',
     components: {         
         Icon,
         'v-map': Vue2Leaflet.Map,
         'v-tilelayer': Vue2Leaflet.TileLayer,
         'v-marker': Vue2Leaflet.Marker         

     },

     data (){
         return {
             zoom:13,
             center: L.latLng(47.413220, -1.219482),
             url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
             attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
             marker: L.latLng(47.413220, -1.219482),             
             form: {
                 payBool: false,
                 gender: '',
                 specials: [],
                 rating: 0,
                 distance: 0
             },
             created(){
                 initlializeMap();

             },
             specials: [
                 {
                     title: 'Changing',
                     icon: 'child',
                     
                 },
                 {
                     title: 'Disabled',
                     icon: 'wheelchair-alt'
                 }
             ],
             
             genders: [
                 {
                     title: 'Men',
                     icon: 'male'
                 },
                 {
                     title: 'Women',
                     icon: 'female'
                     
                 },
                 {
                     title: 'Trans',
                     icon: 'intersex'
                     
                 }

             ]
         }
     },
     methods: {
         getDistanceToNextBathroom: function(){

             
         }
         
     }
 }
</script>

<style>

 @import "~leaflet/dist/leaflet.css";
 body, html {
     height: 100%;
     margin: 0px;
 }

 .map-container: {

 }
 
 h1 {
     font-family: 'Patrick Hand', Helvetica, Arial, sans-serif;
     padding-top: 30px;
     font-size: 40px;
     font-weight: bolder;
     color: white;
     -webkit-text-stroke: 1px black;
 }
 
 #app {     
     text-align: center;     
 }

 .results {
     height: 100%;
     width: 64%;
     position: absolute;
     right: 0px;
 }

 .sidebar {
     width: 36%;
     height: 100%;
     position: absolute;
     left: 0px;
 }
 

</style>
