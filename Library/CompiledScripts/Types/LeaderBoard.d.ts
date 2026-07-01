declare namespace APJS {
  /**
   * @class Leaderboard
   * @extends DynamicComponent
   * @description Leaderboard component. Component that displays leaderboard.
   * @apjs_protected_constructor
   */
  class Leaderboard extends DynamicComponent {
    protected constructor();

    /**
     * @description Get current score.
     * @returns {number}
     */
    getScore(): number;

    /**
     * @description Set current score.
     * @param {number} score - New score to set to
     */
    setScore(score: number): void;

    /**
     * @description Post current final score.
     */
    postFinalScore(): void;
  }

  /**
   * @class SocialService
   * @description Provides user-facing APIs for the Social and Leaderboard Service. Allows querying user profiles,
   * friend lists, leaderboard rankings, and posting scores from user scripts.
   * @example
   * const social = new SocialService();
   * social.initializeLeaderboard(SocialService.LeaderboardOrder.HighToLow, (data) => {
   *   if (data) {
   *     console.log('Best score:', data.bestScore);
   *   }
   * });
   */
  class SocialService {
    /**
     * @constructor
     */
    constructor();

    /**
     * @description Retrieves the current user's TikTok profile information. Waits for both the
     * leaderboard system and friends list to be ready before returning the profile.
     * @param onSuccess - Called with the user's UserProfile when the data is ready.
     * @param onFailure - Called with an error message if the profile cannot be retrieved.
     */
    public getUserProfile(
      onSuccess: (profile: SocialService.UserProfile) => void,
      onFailure?: (error: string) => void
    ): void;

    /**
     * @description Retrieves the TikTok profile of a friend at the given 1-based index.
     * Valid indices are 1 to the user's friend count (max 50).
     * @param {number} index - The 1-based index of the friend to retrieve.
     * @param onSuccess - Called with a UserProfile if available, or `null` if no friend exists at the given index.
     * @param onFailure - Called with an error message on failure.
     */
    public getFriendProfileAtIndex(
      index: number,
      onSuccess: (profile: SocialService.UserProfile | null) => void,
      onFailure?: (error: string) => void
    ): void;

    /**
     * @description Posts the current score to the server. The score must have been set
     * previously via setScoreAndGetRankings.
     */
    public postScore(): void;

    /**
     * @description Sets the current score and computes the user's real-time rankings across all
     * leaderboard types. The leaderboard must have been initialized via initializeLeaderboard first.
     * @param {number} currScore - The score value to set.
     * @returns {SocialService.Rankings} A Rankings object with the computed friend, national, and global ranks.
     */
    public setScoreAndGetRankings(currScore: number): SocialService.Rankings;

    /**
     * @description Initializes the leaderboard with the specified sort order and waits for
     * leaderboard data to arrive from the server.
     * @param sortBy - The ranking order (LeaderboardOrder).
     * @param onSuccess - Called with a LeaderboardData object containing the user's best score
     * and highest rankings, or `null` if no data is available.
     * @param onFailure - Called with an error message on failure.
     * @example
     * const social = new SocialService();
     * social.initializeLeaderboard(SocialService.LeaderboardOrder.HighToLow, (data) => {
     *   if (data) {
     *     console.log('Best score:', data.bestScore);
     *     console.log('Friends rank:', data.highestRankings.friendsRank);
     *   }
     * });
     */
    public initializeLeaderboard(
      sortBy: SocialService.LeaderboardOrder,
      onSuccess: (data: SocialService.LeaderboardData | null) => void,
      onFailure?: (error: string) => void
    ): void;

    /**
     * @description Retrieves the leaderboard entry at the given 1-based index for the specified
     * leaderboard type. Valid indices are 1 to 6. If the current user's rank is 6 or lower,
     * index 6 will display the current user's entry. The leaderboard must have been initialized first.
     * @param {number} index - The 1-based index (1–6) of the entry to retrieve.
     * @param type - The leaderboard type (LeaderboardType).
     * @param onSuccess - Called with a LeaderboardInfo object.
     * @param onFailure - Called with an error message on failure, including invalid index.
     * @example
     * social.getLeaderboardInfo(1, SocialService.LeaderboardType.Global, (info) => {
     *   console.log(info.userName, info.score, info.ranking);
     * }, (error) => {
     *   console.error(error);
     * });
     */
    public getLeaderboardInfo(
      index: number,
      type: SocialService.LeaderboardType,
      onSuccess: (info: SocialService.LeaderboardInfo) => void,
      onFailure: (error: string) => void
    ): void;
  }

  namespace SocialService {
    /**
     * @description Leaderboard type for ranking scope.
     * @enum
     * @property {number} Friend - Rank among friends.
     * @property {number} National - Rank among all users in the same country.
     * @property {number} Global - Rank among all users worldwide.
     * @example
     * social.getLeaderboardInfo(1, SocialService.LeaderboardType.Friend, (info) => {
     *   console.log(info.ranking);
     * });
     */
    enum LeaderboardType {
      /** Rank among friends. */
      Friend = 0,
      /** Rank among all users in the same country. */
      National = 1,
      /** Rank among all users worldwide. */
      Global = 2,
    }

    /**
     * @description Leaderboard ranking sort order.
     * @enum
     * @property {number} HighToLow - Higher scores are ranked higher.
     * @property {number} LowToHigh - Lower scores are ranked higher.
     */
    enum LeaderboardOrder {
      /** Higher scores are ranked higher. */
      HighToLow = 0,
      /** Lower scores are ranked higher. */
      LowToHigh = 1,
    }

    /**
     * @class UserProfile
     * @description Contains a user's TikTok profile information, including the profile photo
     * texture, username, and friend count. Used for both the current user and friends.
     */
    class UserProfile {
      /**
       * @constructor
       */
      constructor();

      /**
       * @description The user's profile photo texture.
       */
      public profileTexture: Texture;

      /**
       * @description The user's TikTok username.
       */
      public userName: string;

      /**
       * @description The number of friends the user has. Only populated for the current user;
       * `undefined` when retrieved via getFriendProfileAtIndex.
       */
      public friendCount: number | undefined;
    }

    /**
     * @class Rankings
     * @description Contains the user's ranking positions across different leaderboard types
     * (friends, national, and global).
     */
    class Rankings {
      /**
       * @constructor
       */
      constructor();

      /**
       * @description The user's rank among friends.
       */
      public friendsRank: number;

      /**
       * @description The user's national rank.
       */
      public nationalRank: number;

      /**
       * @description The user's global rank.
       */
      public globalRank: number;
    }

    /**
     * @class LeaderboardData
     * @description Contains the user's leaderboard data returned after initialization,
     * including the best score and highest historical rankings.
     */
    class LeaderboardData {
      /**
       * @constructor
       */
      constructor();

      /**
       * @description The user's best score achieved, or -1 if no score has been recorded.
       */
      public bestScore: number;

      /**
       * @description The user's highest historical rankings across all leaderboard types.
       */
      public highestRankings: Rankings;
    }

    /**
     * @class LeaderboardInfo
     * @description Contains the leaderboard entry information for a user at a specific
     * index and leaderboard type, including profile, score, and ranking.
     */
    class LeaderboardInfo {
      /**
       * @constructor
       */
      constructor();

      /**
       * @description The profile photo texture of the user at this leaderboard entry.
       */
      public profileTexture: Texture;

      /**
       * @description The TikTok username of the user at this leaderboard entry.
       */
      public userName: string;

      /**
       * @description The score of the user at this leaderboard entry.
       */
      public score: number;

      /**
       * @description Whether this leaderboard entry belongs to the current user.
       */
      public isCurrentUser: boolean;

      /**
       * @description The ranking position of this leaderboard entry.
       */
      public ranking: number;
    }
  }
}
