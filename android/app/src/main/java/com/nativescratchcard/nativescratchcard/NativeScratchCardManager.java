package com.nativescratchcard.nativescratchcard;

import android.support.annotation.NonNull;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.nativescratchcard.R;

import in.codeshuffle.scratchcardlayout.listener.ScratchListener;
import in.codeshuffle.scratchcardlayout.ui.ScratchCardLayout;

public class NativeScratchCardManager extends ViewGroupManager<ScratchCardLayout> {
    private static final String REACT_CLASS = "NativeScratchCard";

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    public ScratchCardLayout createViewInstance(@NonNull ThemedReactContext context) {
        Log.d(REACT_CLASS, "createViewInstance");
        ScratchCardLayout card = new ScratchCardLayout(context);
        onReceiveNativeEvent(context, card);
        card.setScratchDrawable(context.getResources().getDrawable(R.drawable.rn_image_scratch));
        return card;
    }

    @Override
    public void addView(ScratchCardLayout parent, View child, int index) {
        Log.d(REACT_CLASS, "addView");
        parent.addView(child);
    }

    @ReactProp(name = "brushWidth")
    public void setScratchBrushWidth(ScratchCardLayout card, int width) {
        Log.d(REACT_CLASS, "brush width: " + width);
        card.setScratchWidth(width);
    }

    @ReactProp(name = "finishAt")
    public void setScratchFinishAt(ScratchCardLayout card, int finish) {
        Log.d(REACT_CLASS, "finish at: " + finish);
        card.setRevealFullAtPercent(finish);
    }


    @ReactProp(name = "enabled")
    public void setScratchEnabled(ScratchCardLayout card, boolean enabled) {
        Log.d(REACT_CLASS, "enabled");
        card.setScratchEnabled(enabled);
    }


    private void onReceiveNativeEvent(final ThemedReactContext reactContext, final ScratchCardLayout card) {
        card.setScratchListener(new ScratchListener() {
            @Override
            public void onScratchStarted() {
                Log.d(REACT_CLASS, "started");
                WritableMap event = Arguments.createMap();
                event.putBoolean("started", true);
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        card.getId(),
                        "topChange",
                        event
                );
            }

            @Override
            public void onScratchProgress(ScratchCardLayout scratchCardLayout, int atLeastScratchedPercent) {
                WritableMap event = Arguments.createMap();
                Log.d(REACT_CLASS, "progress: " + String.valueOf(atLeastScratchedPercent));
                event.putInt("progress", atLeastScratchedPercent);
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        card.getId(),
                        "topChange",
                        event
                );
            }

            @Override
            public void onScratchComplete() {
                Log.d(REACT_CLASS, "finished");
                WritableMap event = Arguments.createMap();
                event.putBoolean("finished", true);
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        card.getId(),
                        "topChange",
                        event
                );
            }
        });
    }
}
