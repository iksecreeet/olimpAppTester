import React, { Component } from 'react';
import {
    ScrollView,
    View
} from 'react-native';

export default class Carousel extends Component {
    state: {
        offset: ?Number
    }

    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
        }
    }

    renderBubbles = (width: Number) => {
        const {
            children,
            color = '#ffa500',
            //dimmedColor = '#d3d3d3',
            bubbleWidth = 9,
            bubbleHeight = 9
        } = this.props;

        let bubbles = [];

        const emptyBubble = {
            width: bubbleWidth,
            height: bubbleHeight,
            //backgroundColor: dimmedColor,
            borderWidth: 1,
            borderColor: 'white',
            marginLeft: 10,
            borderRadius: 15,
            alignSelf: 'center',
        }

        const filledBubble = {
            width: bubbleWidth,
            height: bubbleHeight,
            backgroundColor: color,
            borderRadius: 15,
            marginLeft: 10,
            alignSelf: 'center',
        }

        for (var i=0; i<children.length; i++) {
            bubbles.push (
                <View style={ emptyBubble } key={ width * i }/>
            )
        }

        if (this.state.offset % width === 0) {
            bubbles.map((v) => {
                v.key == this.state.offset
                    ? bubbles[v.key / width]
                        = <View style={ filledBubble } key={ v.key }/>
                    : null;
            })
        }

        return (
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                { bubbles }
            </View>
        )
    }

    render() {
        const {
            backgroundColor = '#fff',
            children,
            height = 350,
            showBubbles = true,
            showScroll = false,
            width = 350,
        } = this.props;

        let pages = [];

        for (var i=0; i<children.length; i++) {
            pages.push (
                <View style={{ width: width }} key={ i }>
                { children[i] }
                </View>
            )
        }

        return (
            <View style={{ width: width, backgroundColor: backgroundColor }}>
                <ScrollView
                    horizontal={ true }
                    pagingEnabled={ true }
                    showsHorizontalScrollIndicator={ showScroll }
                    onScroll={ (e)=>{
                        this.setState({offset: e.nativeEvent.contentOffset.x})
                    }}
                    style={{ width: width, height: height, marginBottom: 15, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,

                    elevation: 6, backgroundColor: '#FFF', borderRadius: 10 }}>
                    { pages }
                </ScrollView>
                { showBubbles ? this.renderBubbles(width) : null }
            </View>
        )
    }
}
