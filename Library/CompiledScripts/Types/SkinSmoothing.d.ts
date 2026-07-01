declare namespace APJS {
  /**
   * @class FaceRetouch
   * @extends DynamicComponent
   * @description Face retouch component for skin smoothing and related facial enhancement effects.
   */
  class FaceRetouch extends DynamicComponent {
    protected constructor();
  
    /**
  	     * @description dark circles reduction intensity, range [0, 1], default is 0.5.
  	     * Higher values produce a stronger dark circle reduction effect. Set to 1 for maximum reduction.
  	     * @type {number}
  	     */
    darkCirclesIntensity: number;
  
    /**
       * @description eye brilliance intensity, range [0, 1], default is 0.5.
       * @type {number}
       */
    eyeBrillianceIntensity: number;
  
    /**
       * @description skin texture intensity, range [0, 1], default is 0.5.
       * @type {number}
       */
    skinTextureIntensity: number;
  
    /**
       * @description smile lines intensity, range [0, 1], default is 0.5.
       * @type {number}
       */
    smileLinesIntensity: number;
  }
}