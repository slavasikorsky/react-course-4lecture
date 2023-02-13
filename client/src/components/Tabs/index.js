import { useState } from "react";
import "./Tabs.scss";

function Tabs({ tabs }) {
	const [activeTab, setActiveTab] = useState(tabs[0].name);
	return (
		<div className="tabs">
			{tabs &&
				tabs.map((tab) => (
					<button
						type="button"
						className={activeTab === tab.name ? "active" : ""}
						key={tab.name}
						onClick={() => setActiveTab(tab.name)}
					>
						{tab.name}
					</button>
				))}
			<div className="tab-content">
				{tabs &&
					tabs.map((tab) => (
						<div key={tab.name}>
							{activeTab === tab.name ? tab.content : null}
						</div>
					))}
			</div>
		</div>
	);
}

export default Tabs;
