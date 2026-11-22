div className="pillars">
          {PILLARS.map((p, i) => (
            <div key={p.title} className={`pillar ${p.tone}`}>
              <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
            