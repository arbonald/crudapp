(function(){ 
    var app = angular.module('starter.contactstore', []);
        app.factory('ContactStore', function(){
            var contactos = angular.fromJson(window.localStorage['contactos'] ||'[]');
            function persist(){
                window.localStorage['contactos'] = angular.toJson(contactos);
            }
                return {
                list: function(){
                    return contactos;
         },
                get:function(id){
                return contactos.filter(function(contacto){
                    return contacto.id === id;
                })[0];
         },
             
                create: function(contacto){
                    contactos.push(contacto);
                    persist();
                },
                 update: function(contacto){
                        for(var i = 0; i < contactos.length; i++){
                        if(contactos[i].id === contacto.id){
                            contactos[i] = contacto;
                            persist();
                            return;
                            }
                         }
                },

                 remove: function(id){
                         for(var i = 0; i < contactos.length; i++){
                        if(contactos[i].id === id){
                            contactos.splice(i, 1);
                            persist();
                            return;
                            }
                         }
                }

            };    
        });
    }());