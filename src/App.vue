<template>
    <div id="app" >
        <div class="sidebar" style="background: #B4DDDD">
            <div class="side-header">
                
                <div><span><img height="100%" width="100%" src="../static/FindYourLooFont.png"></img></span></div>
                
                
                <div><span style="height: 50%; width: 50%; padding-right: 20px"><img src="../static/SchuhLogo.svg"></img></span></div>
                
                
                
                
            </div>
            <div class="filters" style="padding: 20px; padding-top: 0px">
                
                <el-card>
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
                                <span v-for="gender in genders"><el-checkbox :label="gender.title" style="padding-left: 3px; padding-right: 3px"></el-checkbox><icon  style="padding-left: 3px; padding-right: 6px" :name="gender.icon"></icon></span>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="Special needs?">                        
                            <el-checkbox-group v-model="form.specials">
                                <span v-for="special in specials"><el-checkbox :label="special.title" style="padding-left: 3px; padding-right: 3px"></el-checkbox><icon style="padding-left: 3px; padding-right: 3px" :name="special.icon"></icon></span>              
                            </el-checkbox-group>                        
                        </el-form-item>                    
                    </el-form>
                </el-card>
                
                <div style="display: flex; justify-content: space-between; padding: 5px; ">
                    <div style="flex: 2"><el-button><img src="../static/Loo-Man.svg" height="40%" width="40%"></img><br>Join the club</el-button></div>
                    <div style="flex: 2"><el-button @click="toiletModal=true"><img style="color: white" height="40%" width="40%" src="../static/KlobuersteIcon.svg"></img> <br>Add a Loo </el-button></div>
                    
                    
                </div>
            </div>
                
            <el-dialog v-model="toiletModal"   title="Add a Loo">
                <el-form ref="form" :model="newToilet" label-width="120px">
                    <el-form-item  label="Nickname">
                        <el-input v-model="newToilet.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="Rating">
                        <el-rate void-color="black" v-model="newToilet.rating"></el-rate>
                    </el-form-item>
                    <el-form-item label="Pay toilet?">
                        <el-switch
                            v-model="newToilet.payBool"
                            active-text="pay toilets"
                            inactive-text="only free toilets">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="Who's allowed?">
                        <el-checkbox-group v-model="newToilet.gender">
                            <span v-for="gender in genders"><el-checkbox :label="gender.title" style="padding-left: 3px; padding-right: 3px"></el-checkbox><icon  style="padding-left: 3px; padding-right: 6px":name="gender.icon"></icon></span>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="Special needs?">
                        
                        <el-checkbox-group v-model="newToilet.specials">
                            <span v-for="special in specials"><el-checkbox :label="special.title" style="padding-left: 3px; padding-right: 3px"></el-checkbox><icon style="padding-left: 3px; padding-right: 3px" :name="special.icon"></icon></span>              
                        </el-checkbox-group>
                        
                    </el-form-item>
                    <el-form-item label="Comments:">
                        
                        <el-input v-model="newToilet.comments"
                                  type="textarea"
                                  placeholder="Share your thoughts about this toilet."
                        >
                            
                        </el-input>
                        
                    </el-form-item>                    
                    <!--
                         <el-form-item label="Picture">
                         <el-upload
                         class="upload-demo"
                         drag                            
                         :file-list="fileList"
                         multiple>
                         <i class="el-icon-upload"></i>
                         <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                         <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
                         </el-upload>
                         </el-form-item>

                       -->
                    
                </el-form>
                <el-button type="success" @click="addToilet()">SAVE TOILET</el-button>
            </el-dialog>
            
        </div>
        <div class="results" style="overflow: auto">
            <el-tabs type="card">
                <el-tab-pane label="Map">
                    <div style="height: 100%" class="map-container">
                        <v-map class="mini-map" :zoom=13 :center="[47.413220, -1.219482]" :style="{height: '1000px'}">
                            <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                            <v-marker :lat-lng="[47.413220, -1.219482]"></v-marker>
                        </v-map>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Results">
                    <el-card v-for="toilet in toilets" style="margin: 10px">
                        <div slot="header" class="clearfix">
                            <span>{{ toilet.nickname }}</span>
                            <el-button style="float: right;" type="text"><icon name="plus-circle"></icon> My Loos</el-button>
                        </div>
                        <el-rate
                            v-model="toilet.rating"
                            disabled
                            show-score
                            text-color="#ff9900"
                        ></el-rate>
                        <p>{{ toilet.comments }}</p>
                    </el-card>
                </el-tab-pane>
                
            </el-tabs>
        </div>
    </div>
</template>

<script>

 import app from './db.js'
 var db = app.database()
 var storagae = app.storage()
 var usersRef = db.ref('users')
 var toiletsRef = db.ref('toilets')
 
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
     firebase(){
         return {
             toilets: toiletsRef
         }

     },
     computed: {
         shortenedComment: function(){
             // this function should return a shortened version of the comment in case the comment is too long (plus an ellipsis ...)
             // you can reference the comment like this: this.newToilet.comments
             // if it's not too long, just return the comment





             

         },
     },
     data (){
         return {
             
             zoom:13,
             center: L.latLng(47.413220, -1.219482),
             url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
             attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
             marker: L.latLng(47.413220, -1.219482),
             toiletModal: false,
             
             newToilet: {
                 nickname: '',
                 comments: '',
                 payBool: false,
                 gender: '',
                 specials: [],
                 rating: 0,
                 lat: '',
                 lng: '',                
             },
             form: {
                 payBool: false,
                 gender: '',
                 specials: [],
                 rating: 0,
                 lat: '',
                 lng: '',
                 
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
                     title: 'Unisex',
                     icon: 'intersex'
                     
                 }

             ]
         }
     },
     methods: {
         getDistanceToNextBathroom: function(){

             
         },
         addToilet: function(){
             var self=this;
             db.ref('toilets').push(self.newToilet).then(function(snapshot){

                 // firebase returns promises with info about the changes you made to the database.
                 // on success...
                 self.toiletModal = false;
             }).catch(function(err){
                 // code to check for errors
             })
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

 .side-header {
     display: flex;
     justify-content: space-evenly;
 }

</style>
