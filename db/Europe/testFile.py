import pandas as pd
import sys
import os
import geopandas as gpd
import matplotlib.pyplot as plt

file = "esra.xlsx"

world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
ax2 = world.plot( figsize=(8,4), edgecolor=u'gray', cmap='Set2' )
world

def plot_map(col, data, free_legend=False, lower=0.0, higher=1.0):
    world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
    #ax2 = world.plot( figsize=(8,4), edgecolor=u'gray', cmap='Set2' )

    merge_df = pd.merge(left=world, right=data, how="left", left_on="name", right_on="Country")

    vmin = lower#data[col].min()
    vmax = higher#data[col].max()
    cmap = "viridis"

    fig, ax = plt.subplots(1, figsize=(20, 8))
    ax.axis('off')
    if not free_legend:
        merge_df.plot(column=col, ax=ax, edgecolor='0.8', linewidth=1, cmap=cmap, legend=free_legend, vmin=lower, vmax=higher)
    else:
        merge_df.plot(column=col, ax=ax, edgecolor='0.8', linewidth=1, cmap=cmap, legend=free_legend)
    world.boundary.plot(ax=ax, linewidth=0.4, edgecolor=u'gray')

    ax.set_title(col, fontdict={'fontsize': '25', 'fontweight': '3'})

    if not free_legend:
        # Create colorbar as a legend
        sm = plt.cm.ScalarMappable(norm=plt.Normalize(vmin=vmin, vmax=vmax), cmap=cmap)
        # Empty array for the data range
        sm._A = []
        # Add the colorbar to the figure
        cbaxes = fig.add_axes([0.15, 0.25, 0.01, 0.4])
        cbar = fig.colorbar(sm, cax=cbaxes)

    plt.plot()
    plt.show()

data = pd.read_excel(file,sheet_name=2)
data.rename(columns={"Column1" : "Country"}, inplace=True)
for col in data.columns[1:]:
    mask = data[col].str.contains("%", na=False)
    data[col][mask] = data[col][mask].str.rstrip("%").astype(float)/100
data.to_csv('csv/self_declared_behaviour_driver_passenger.csv')

for i in range(len(data.columns)-1):
    print(data.columns[1+i])
    print(data.columns[2+i])
    #plot_map(data.columns[1+i], data)