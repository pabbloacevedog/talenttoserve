<template>
	<div :key="up_home">
		<center style="height: 100%;">
			<div v-if="$q.platform.is.mobile" class="col-12 contenedor-conv" style="min-height: 98vh;">
				<div class="col-12 title_">
					<label class="f_roboto_l" style="padding-right: 10px;">Conversaciones</label> 
					<i class="fas fa-comments"></i>
				</div>
                <div v-for="(item) in items" :key="item.id_message" @click="goConversationMB(item)" class="m_list">
                    <MessageList :item="item"></MessageList>
                </div>
			</div>
			<div v-else class="row q-col-gutter-sm tamanio" style="min-height: 98vh;">
				<div class="col-lg-4 col-md-4 col-xs-12 col-sm-12 contenedor-conv">
                    <div class="col-12 title_">
						<label class="f_roboto" style="padding-right: 10px;">Conversaciones</label> 
						<i class="fas fa-comments"></i>
                    </div>
					<q-card class="parent_conv">
						<q-scroll-area
							:thumb-style="thumbStyle"
							:content-style="contentStyle"
							:content-active-style="contentActiveStyle"
							style="height: 100%; max-width: 100%;"
						>
							<q-card-actions align="left" class="comment-view">
								<div v-for="(item) in items" :key="item.id_message" @click="goConversation(item)" class="m_list">
                                <MessageList :item="item"></MessageList>
                            </div>
							</q-card-actions>
						</q-scroll-area>
					</q-card>
				</div>
                <div v-if="init" class="col-lg-8 col-md-8 col-xs-12 col-sm-12 marco-galeria box-conv">
                    <div class="col-12 participants">
						<label class="f_roboto" style="padding-right: 10px;">Inicia una nueva conversación</label> 
						<i class="fas fa-comments"></i>
                    </div>
                    <q-card
                        class="text-white parent_conv"
                        >
                        <q-card-section>
                            <div class="text-h6">Our Changing Planet</div>
                            <div class="text-subtitle2">by John Doe</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">

                        </q-card-section>
                    </q-card>
                </div>
				<div v-else class="col-lg-8 col-md-8 col-xs-12 col-sm-12 marco-galeria box-conv">
                    <div class="col-12 participants">
                        <div class="col-11" align="center">
                            <q-avatar size="40px">
                                <img :src="avatar_addressee">
                            </q-avatar>
                            <label class="f_roboto_l" style="padding-left: 10px;">{{name_addressee}}</label> 
                        </div>
                    </div>
					<q-card class="parent_conv">
						<q-scroll-area
							:thumb-style="thumbStyle"
							:content-style="contentStyle"
							:content-active-style="contentActiveStyle"
							style="height: 100%; max-width: 100%;"
						>
							<q-card-actions align="left" class="comment-view">
								<Conversation :conversation="messages"></Conversation>
							</q-card-actions>
						</q-scroll-area>
						<q-card-actions class="area_comment">
							<div style="width: 100%;" class="row"> 
								<div class="row col-md-12 col-lg-12 col-xl-12">
									<AddMessage :uuid_user="uuid_user" :uuid_user_addressee="uuid_user_addressee"> </AddMessage>
								</div>
							</div>
						</q-card-actions>
					</q-card>
				</div>
			</div>
		</center>
		<div style="max-width: 100%">

		</div>
        <q-dialog
        v-model="conversationUp"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
        >
                <q-card class="parent_conv">
                    <q-card-section style="padding: 0px;">
                        <div class="col-12 row title_" >
                            <div class="col-1" @click="conversationUp = false">
                                <i class="fas fa-arrow-circle-left fa-2x"></i>
                            </div>
                            <div class="col-11" align="center">
                                <q-avatar size="40px">
                                    <img :src="avatar_addressee">
                                </q-avatar>
                                <label class="f_roboto_l" style="padding-left: 10px;">{{name_addressee}}</label> 
                            </div>
                        </div>
                        <!-- <div>
                            <label class="f_roboto cursor-pointer comment_user">{{name_addressee}} </label> 
                        </div> -->
                    </q-card-section>
                    <q-scroll-area
                        ref="scrollArea"
                        :thumb-style="thumbStyle"
                        :content-style="contentStyle"
                        :delay="1200"
                        :content-active-style="contentActiveStyle"
                        style="height: 100%; max-width: 100%;"
                    >
                        <q-card-actions align="left" class="comment-view">
                            <Conversation :conversation="messages"></Conversation>
                        </q-card-actions>
                    </q-scroll-area>
                    <q-card-actions class="area_comment">
                        <div style="width: 100%;" class="row"> 
                            <div class="row todo">
                                <AddMessage :uuid_user="uuid_user" :uuid_user_addressee="uuid_user_addressee"> </AddMessage>
                            </div>
                        </div>
                    </q-card-actions>
                </q-card>
        </q-dialog>
	</div>
</template>

<script src="./explorer.js">
</script>

<style lang="stylus" >
	@import './explorer.styl'
</style>
