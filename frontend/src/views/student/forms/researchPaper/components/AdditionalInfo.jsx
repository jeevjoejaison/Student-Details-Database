import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileAlt, faBook, faUsers, faUniversity, faIdBadge,
    faAlignLeft, faPlay, faBookOpen, faFlask, faChartBar,
    faComments, faFlagCheckered, faBookmark, faHashtag,
    faLink, faBalanceScale
} from "@fortawesome/free-solid-svg-icons";
const AdditionalInfo = () => {
  return (
    <div>
        {/* Additional Information */}
        <div className="form-section">
                    <div className="form-grid">
                        <div className="input-group">
                            <label>
                                <FontAwesomeIcon icon={faBookmark} /> Journal Name
                            </label>
                            <input type="text" />
                        </div>

                        <div className="input-group">
                            <label>
                                <FontAwesomeIcon icon={faHashtag} /> Volume/Issue
                            </label>
                            <input type="text" />
                        </div>

                        <div className="input-group">
                            <label>
                                <FontAwesomeIcon icon={faLink} /> DOI
                            </label>
                            <input type="text" />
                        </div>

                        <div className="input-group">
                            <label>
                                <FontAwesomeIcon icon={faBalanceScale} /> License
                            </label>
                            <select>
                                <option>CC BY 4.0</option>
                                <option>CC BY-SA 4.0</option>
                                <option>All Rights Reserved</option>
                                <option>Public Domain</option>
                            </select>
                        </div>

                        <div className="input-group full-width">
                            <label>
                                <FontAwesomeIcon icon={faBook} /> Bibliography
                            </label>
                            <textarea rows="6" placeholder="Add references in APA/MLA format"></textarea>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default AdditionalInfo