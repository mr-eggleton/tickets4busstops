<template>
    <b-button class="button ticket-button-container ">
<!--       @click="$router.push(`/tickets/${ticket.uuid}`)">-->
        <div class="ticket-button-contents-container">
            <div class="ticket-button-content-container">
                <div class="ticket-button-content logo">
                    <div class="ticket-button-logo-container">
                        <ResourceRenderer :resource="retailingOperatorLogo" :defaultProperties="{'--background-size': 'contain', '--background-position': 'left bottom'}"></ResourceRenderer>
                    </div>
                </div>
                <div class="ticket-button-content name">
                    {{ ticket.name }}
                </div>
            </div>
            <div class="ticket-button-background-container">
                <ResourceRenderer :resource="retailingOperatorImage"></ResourceRenderer>
            </div>
        </div>
    </b-button>
</template>
    

<script>
    import ResourceRenderer from '~/components/ResourceRenderer.vue'

    export default {
        name: "TicketCard",
        components: {
            'ResourceRenderer': ResourceRenderer
        },
        props: [
            'ticket'
        ],
        data() {
            return {
                retailingOperatorLogo: this.ticket.retailingOperator.logo,
                retailingOperatorImage: this.ticket.retailingOperator.defaultImage,
                dateDivisions: [
                    { amount: 60, name: 'seconds' },
                    { amount: 60, name: 'minutes' },
                    { amount: 24, name: 'hours' },
                    { amount: 7, name: 'days' },
                    { amount: 4.34524, name: 'weeks' },
                    { amount: 12, name: 'months' },
                    { amount: Number.POSITIVE_INFINITY, name: 'years' }
                ]
            }
        },
        methods: {
            layerBackgroundProperties: function(resource) {
                return Object.assign({}, resource.properties, {'--layer-data': `${resource.resource.dataType == 'url' ? 'url(' : ''}${resource.resource.data}${resource.resource.dataType == 'url' ? ')' : ''}`})
            },
            log: function(x) {
                console.log(x);
                return {};
            },
            formatDateString: function(date) {
                const formatter = new Intl.RelativeTimeFormat(undefined, {
                    numeric: 'auto'
                });
                return this.formatDateStringAgo(formatter, date);
            },
            formatDateStringAgo: function(formatter, date) {
                let duration = (date - new Date()) / 1000;

                for (let i = 0; i <= this.dateDivisions.length; i++) {
                    const division = this.dateDivisions[i];
                    if (Math.abs(duration) < division.amount) {
                        return formatter.format(Math.round(duration), division.name);
                    }
                    duration /= division.amount;
                }
            },
            formatDateStringIn: function(formatter, date) {
                return formatter.format(date, 'days');
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .ticket-button-container {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: flex-start;
        border-radius: 8px;
        overflow: hidden;
        min-height: 200px;
        margin: 10px 0;
        padding: 15px;
        box-shadow: 0px 25px 25px rgba(0, 0, 0, 0.4);
        transform-style: preserve-3d;
        perspective: 1000px;
        transition: all 0.2s ease-out;
    }
    .ticket-button-container .ticket-button-contents-container {
        min-height: 188px;
        height: 188px;
        max-height: 188px;        
    }
    .ticket-button-container .ticket-button-contents-container .ticket-button-content-container {
        display: flex;
        position: relative;
        z-index: 1;
        min-height: 100%;
        flex-direction: column;
        justify-content: flex-end;
    }
    .ticket-button-container .ticket-button-contents-container .ticket-button-content-container .ticket-button-content.logo, .ticket-button-container .ticket-button-contents-container .ticket-button-content-container .ticket-button-content.logo * {
        display: flex;
        position: relative;
        align-self: flex-start;
        margin: 0 auto auto 0;
        width: 180px;
        height: 40px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: left;
    }
    .ticket-button-container .ticket-button-contents-container .ticket-button-content-container .ticket-button-content.name, .ticket-button-container .ticket-button-contents-container .ticket-button-content-container .ticket-button-content.expiry {
        display: flex;
        margin: 0 auto 0 0;
        font-size: x-large;
        font-family: var(--primary-font);
        font-weight: 700;
        color: #FFFFFF;
    }
    .ticket-button-container .ticket-button-contents-container .ticket-button-content-container .ticket-button-content.expiry span {
        margin-right: 6px;
        color: #999999;
    }
    .ticket-button-container .ticket-button-background-container {
        position: absolute;
        z-index: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        /* background-color: blue; */
    }

</style>