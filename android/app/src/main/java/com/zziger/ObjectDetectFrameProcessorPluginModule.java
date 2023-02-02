package com.zziger;

import androidx.camera.core.ImageProxy;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

public class ObjectDetectFrameProcessorPluginModule extends FrameProcessorPlugin {
    @Override
    public Object callback(ImageProxy image, Object[] params) {
        String result = "fake kết quả detect";
        return result;
    }

    ObjectDetectFrameProcessorPluginModule() {
        super("objectDetect");
    }
}
