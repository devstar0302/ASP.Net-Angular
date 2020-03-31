using System;
using System.Collections.Generic;
using Newtonsoft.Json;
namespace Models
{
    public class SiteContent
    {
        public int id { get; set; }
        //[JsonProperty(PropertyName = "n")]
        public string name { get; set; } //name of the tag
        //[JsonProperty(PropertyName = "h")]
        public string header { get; set; } //name displayed in the html title
        //[JsonProperty(PropertyName = "hs")]
        public string headerSub { get; set; } //sub name displayed in the html title
        [JsonIgnore]
        public int pages_MaxLength = 4;
        //[JsonProperty(PropertyName = "ps")]
        public List<Page> pages { get; set; }
        public SiteContent()
        {
            pages = new List<Page>();
        }
    }

    public class Page
    {
        [JsonIgnore]
        public int sections_MaxLength = 25;
        //[JsonProperty(PropertyName = "n")]
        public string name { get; set; }
        //[JsonProperty(PropertyName = "s")]
        public List<Section> sections { get; set; }
        //[JsonProperty(PropertyName = "ts")]
        public List<string> tags { get; set; } //list of tags in the sections in the page that can be used for infinite scrolling
        public Page()
        {
            sections = new List<Section>();
            tags = new List<string>();
        }
    }

    public class Section
    {
        [JsonIgnore]
        public Page page;

        [JsonProperty(PropertyName = "t")]
        public string sectionType { get; set; }
        [JsonProperty(PropertyName = "n")]
        public string sectionName { get; set; }
        [JsonProperty(PropertyName = "ns")]
        public string sectionNameSub { get; set; }
        [JsonProperty(PropertyName = "tx")]
        public string sectionText { get; set; }

        [JsonIgnore]
        public int sectionFact_MaxLength = 10;
        [JsonProperty(PropertyName = "sF")]
        public List<SectionDataFact> sectionFact { get; set; }

        [JsonIgnore]
        public int sectionImagesRibbon_MinLength = 10;
        [JsonIgnore]
        public int sectionImagesRibbon_MaxLength = 15;
        [JsonProperty(PropertyName = "sIR")]
        public List<SectionDataImagesRibbon> sectionImagesRibbon { get; set; }

        [JsonIgnore]
        public int sectionVideosRibbon_MinLength = 5;
        [JsonIgnore]
        public int sectionVideosRibbon_MaxLength = 15;
        [JsonProperty(PropertyName = "sVR")]
        public List<SectionDataVideosRibbon> sectionVideosRibbon { get; set; }

        [JsonIgnore]
        public int sectionTextList_MinLength = 0;
        [JsonIgnore]
        public int sectionTextList_MaxLength = 10;
        [JsonProperty(PropertyName = "sTL")]
        public List<SectionDataTextList> sectionTextList { get; set; }

        [JsonIgnore]
        public int sectionImagesScroll_MinLength = 5;
        [JsonIgnore]
        public int sectionImagesScroll_MaxLength = 15;
        [JsonProperty(PropertyName = "sIS")]
        public List<SectionDataImagesScroll> sectionImagesScroll { get; set; }

        [JsonIgnore]
        public int sectionImagesList_MinLength = 5;
        [JsonIgnore]
        public int sectionImagesList_MaxLength = 20;
        [JsonProperty(PropertyName = "sIL")]
        public List<SectionDataImagesList> sectionImagesList { get; set; }
    }

    public static class SectionType
    {
        public static string imageslist = "imageslist";
        public static string imagesscroll = "imagesscroll";
        public static string imagesribbon = "imagesribbon";
        public static string video = "video";
        public static string videosribbon = "videosribbon";
        public static string textlist = "textlist";
        public static string textblock = "textblock";
        public static string textheader = "textheader";
    }

    public class SectionDataFact
    {
        [JsonProperty(PropertyName = "f")]
        public string fact { get; set; }
        [JsonIgnore]
        public int tag_MaxLength = 5;
        [JsonProperty(PropertyName = "ts")]
        public List<string> tag { get; set; }
        [JsonProperty(PropertyName = "v")]
        public string value { get; set; }

        public SectionDataFact()
        {
            tag = new List<string>();
        }
    }

    public class SectionDataImagesRibbon
    {
        [JsonProperty(PropertyName = "t")]
        public string thumnail { get; set; }
        [JsonProperty(PropertyName = "i")]
        public string image { get; set; }
    }

    public class SectionDataVideosRibbon
    {
        [JsonProperty(PropertyName = "t")]
        public string thumnail { get; set; } //thumnail
        [JsonProperty(PropertyName = "v")]
        public string video { get; set; } //video
        [JsonProperty(PropertyName = "ti")]
        public string title { get; set; } //title
        [JsonProperty(PropertyName = "d")]
        public string duration { get; set; } //duration
        [JsonProperty(PropertyName = "c")]
        public string channel { get; set; } //channel
        [JsonProperty(PropertyName = "vs")]
        public string views { get; set; } //views
    }

    public class SectionDataTag
    {
        [JsonProperty(PropertyName = "ti")]
        public string title { get; set; } //title
        //public string link { get; set; } //phase out
        [JsonProperty(PropertyName = "t")]
        public string tag { get; set; } //phase in
        [JsonProperty(PropertyName = "i")]
        public string image { get; set; } //image
    }

    public class SectionDataTextList : SectionDataTag
    {
        [JsonProperty(PropertyName = "tx")]
        public string text { get; set; }
    }

    public class SectionDataImagesScroll : SectionDataTag
    {
        [JsonProperty(PropertyName = "s")]
        public string titleSub { get; set; }
    }

    public class SectionDataImagesList : SectionDataTag
    {
        [JsonProperty(PropertyName = "s")]
        public string titleSub { get; set; }
    }    
}