import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileAlt, faBook, faUsers, faUniversity, faIdBadge,
    faAlignLeft, faPlay, faBookOpen, faFlask, faChartBar,
    faComments, faFlagCheckered, faBookmark, faHashtag,
    faLink, faBalanceScale
} from "@fortawesome/free-solid-svg-icons";
const GeneralInfo = () => {
  return (
    <div>
        {/* General Information */}
                        <div className="form-section">
                            <div className="form-grid">
                                <div className="input-group">
                                    <label className="required">
                                        <FontAwesomeIcon icon={faBook} /> Paper Title
                                    </label>
                                    <input type="text" required />
                                </div>
        
                                <div className="input-group">
                                    <label className="required">
                                        <FontAwesomeIcon icon={faUsers} /> Authors
                                    </label>
                                    <input type="text" placeholder="Separate authors with commas" required />
                                </div>
        
                                <div className="input-group">
                                    <label className="required">
                                        <FontAwesomeIcon icon={faUniversity} /> Affiliations
                                    </label>
                                    <textarea rows="3" required></textarea>
                                </div>
        
                                <div className="input-group">
                                    <label>
                                        <FontAwesomeIcon icon={faIdBadge} /> ORCID iD
                                    </label>
                                    <input type="text" placeholder="0000-0000-0000-0000" />
                                </div>
                            </div>
        
                            <div className="input-group full-width">
                                <label className="required">
                                    <FontAwesomeIcon icon={faAlignLeft} /> Abstract
                                </label>
                                <textarea rows="5" required></textarea>
                            </div>
                        </div>
    </div>
  )
}

export default GeneralInfo