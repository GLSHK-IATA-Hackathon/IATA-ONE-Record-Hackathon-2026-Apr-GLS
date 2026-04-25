using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Xml.Linq;

namespace WebAPITemplate.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class ConverterController : ControllerBase
    {
        /// <summary>
        /// ONE Record JSON To XSDG
        /// </summary>
        [HttpPost("Mapping1RtoXSDG")]
        public IActionResult Mapping1RtoXSDG([FromBody] JObject jsonPayload)
        {
            try
            {
                // Define XML Namespaces
                XNamespace rsm = "iata:shippersdeclarationfordangerousgoods:1";
                XNamespace ccts = "urn:un:unece:uncefact:documentation:standard:CoreComponentsTechnicalSpecification:2";
                XNamespace udt = "urn:un:unece:uncefact:data:standard:UnqualifiedDataType:8";
                XNamespace ram = "iata:datamodel:3";

                var root = new XElement(rsm + "ShippersDeclarationForDangerousGoods",
                    new XAttribute(XNamespace.Xmlns + "rsm", rsm.NamespaceName),
                    new XAttribute(XNamespace.Xmlns + "ccts", ccts.NamespaceName),
                    new XAttribute(XNamespace.Xmlns + "udt", udt.NamespaceName),
                    new XAttribute(XNamespace.Xmlns + "ram", ram.NamespaceName)
                );

                var dgDeclaration = jsonPayload["cargo:dangerousGoodsDeclaration"];
                var associatedDocs = jsonPayload["cargo:associatedDocuments"] as JArray;
                var masterAwb = associatedDocs?.FirstOrDefault(d => (string)d["cargo:documentType"]?["cargo:code"] == "741");

                // Handling DateTime Formatting
                var issueDateToken = dgDeclaration?["cargo:issueDate"];
                string issueDateStr = "";
                if (issueDateToken != null)
                {
                    issueDateStr = issueDateToken.Type == JTokenType.Date
                        ? issueDateToken.Value<DateTime>().ToString("yyyy-MM-ddTHH:mm:ss")
                        : (string)issueDateToken;
                }

                // --- 1. MessageHeaderDocument ---
                root.Add(new XElement(rsm + "MessageHeaderDocument",
                    new XElement(ram + "ID", (string)masterAwb?["cargo:documentId"]),
                    new XElement(ram + "Name", (string)dgDeclaration?["cargo:documentName"]),
                    new XElement(ram + "TypeCode", (string)dgDeclaration?["cargo:documentTypeCode"]),
                    new XElement(ram + "IssueDateTime", issueDateStr),
                    new XElement(ram + "PurposeCode", "CREATION"),
                    new XElement(ram + "VersionID", "5.00"),
                    new XElement(ram + "ConversationID", "1")
                ));

                // --- 2. BusinessHeaderDocument ---
                var certificationText = (string)dgDeclaration?["cargo:certification"]?["cargo:certificationText"];

                root.Add(new XElement(rsm + "BusinessHeaderDocument",
                    new XElement(ram + "ProcessType", "P"),
                    new XElement(ram + "SignatoryConsignorAuthentication",
                        new XElement(ram + "ActualDateTime"),
                        new XElement(ram + "Statement", certificationText),
                        new XElement(ram + "Signatory"),
                        new XElement(ram + "IssueAuthenticationLocation", new XElement(ram + "Name")),
                        new XElement(ram + "ProviderConsignorAuthenticationParty",
                            new XElement(ram + "DefinedConsignorAuthenticationContact", new XElement(ram + "PersonName"))
                        )
                    )
                ));

                // --- 3. MasterConsignment 解析 ---
                var includedHouseConsignment = new XElement(ram + "IncludedHouseConsignment");

                var involvedParties = jsonPayload["cargo:involvedParties"] as JArray;
                var shipper = involvedParties?.FirstOrDefault(p => (string)p["cargo:partyRole"]?["cargo:code"] == "SHP");
                var consignee = involvedParties?.FirstOrDefault(p => (string)p["cargo:partyRole"]?["cargo:code"] == "CNE");

                // Shipper (ConsignorParty)
                if (shipper != null)
                {
                    includedHouseConsignment.Add(new XElement(ram + "ConsignorParty",
                        new XElement(ram + "PrimaryID"),
                        new XElement(ram + "AdditionalID"),
                        new XElement(ram + "Name", (string)shipper["cargo:partyDetails"]?["cargo:name"]),
                        new XElement(ram + "PostalStructuredAddress",
                            new XElement(ram + "PostcodeCode"),
                            new XElement(ram + "StreetName"),
                            new XElement(ram + "CityName"),
                            new XElement(ram + "CountryID"),
                            new XElement(ram + "CountryName"),
                            new XElement(ram + "CountrySubDivisionName"),
                            new XElement(ram + "PostOfficeBox")
                        ),
                        new XElement(ram + "DefinedTradeContact",
                            new XElement(ram + "PersonName"),
                            new XElement(ram + "DepartmentName"),
                            new XElement(ram + "DirectTelephoneCommunication", new XElement(ram + "CompleteNumber"))
                        )
                    ));
                }

                // Consignee (ConsigneeParty)
                if (consignee != null)
                {
                    includedHouseConsignment.Add(new XElement(ram + "ConsigneeParty",
                        new XElement(ram + "PrimaryID"),
                        new XElement(ram + "AdditionalID"),
                        new XElement(ram + "Name", (string)consignee["cargo:partyDetails"]?["cargo:name"]),
                        new XElement(ram + "PostalStructuredAddress",
                            new XElement(ram + "PostcodeCode"),
                            new XElement(ram + "StreetName"),
                            new XElement(ram + "CityName"),
                            new XElement(ram + "CountryID"),
                            new XElement(ram + "CountryName"),
                            new XElement(ram + "CountrySubDivisionName"),
                            new XElement(ram + "PostOfficeBox")
                        ),
                        new XElement(ram + "DefinedTradeContact",
                            new XElement(ram + "PersonName"),
                            new XElement(ram + "DepartmentName"),
                            new XElement(ram + "DirectTelephoneCommunication", new XElement(ram + "CompleteNumber"))
                        )
                    ));
                }

                // Handling Instructions
                var handlingInstructions = jsonPayload["cargo:textualHandlingInstructions"] as JArray;
                if (handlingInstructions != null)
                {
                    var description = string.Join("\\n", handlingInstructions.Select(h => (string)h));
                    includedHouseConsignment.Add(new XElement(ram + "HandlingInstructions",
                        new XElement(ram + "Description", description),
                        new XElement(ram + "ExclusiveUsageIndicator", "false")
                    ));
                }

                // Associated Reference Document
                if (masterAwb != null)
                {
                    includedHouseConsignment.Add(new XElement(ram + "AssociatedReferenceDocument",
                        new XElement(ram + "ID", (string)masterAwb["cargo:documentId"]),
                        new XElement(ram + "TypeCode", (string)masterAwb["cargo:documentType"]?["cargo:code"]),
                        new XElement(ram + "Name", (string)masterAwb["cargo:documentName"])
                    ));
                }

                // --- 4. RelatedCommercialTradeTransaction (Products & Packages) ---
                var relatedCommercialTradeTransaction = new XElement(ram + "RelatedCommercialTradeTransaction");

                var dangerousGoodsProducts = jsonPayload["cargo:dangerousGoodsProducts"] as JArray;
                if (dangerousGoodsProducts != null)
                {
                    foreach (var dg in dangerousGoodsProducts)
                    {
                        var lineItem = new XElement(ram + "IncludedCommercialTradeLineItem",
                            new XElement(ram + "SequenceNumeric", (string)dg["cargo:sequenceNumber"]),
                            new XElement(ram + "SpecifiedProductTradeDelivery",
                                new XElement(ram + "SpecifiedProductRegulatedGoods",
                                    new XElement(ram + "ApplicableProductDangerousGoods",
                                        new XElement(ram + "UNDGIdentificationCode", (string)dg["cargo:unNumber"]),
                                        new XElement(ram + "PackagingDangerLevelCode", (string)dg["cargo:packingGroup"]),
                                        new XElement(ram + "PackingInstructionTypeCode", (string)dg["cargo:packingInstruction"]),
                                        new XElement(ram + "HazardClassificationID", (string)dg["cargo:hazardClass"]),
                                        new XElement(ram + "ProperShippingName", (string)dg["cargo:properShippingName"]),
                                        new XElement(ram + "HazardCategoryCode", (string)dg["cargo:hazardCategory"])
                                    )
                                )
                            )
                        );
                        relatedCommercialTradeTransaction.Add(lineItem);
                    }
                }

                var packaging = jsonPayload["cargo:packaging"] as JArray;
                if (packaging != null)
                {
                    foreach (var pack in packaging)
                    {
                        var packTypeStr = (string)pack["cargo:packagingTypeDescription"];
                        var specifiedLogisticsPackage = new XElement(ram + "SpecifiedLogisticsPackage",
                            new XElement(ram + "ItemQuantity", (string)pack["cargo:packageCount"]),
                            new XElement(ram + "SequenceNumeric", (string)pack["cargo:packageSequence"]),
                            new XElement(ram + "AllPackedInOneIndicator", ((string)pack["cargo:allPackedInOneIndicator"])?.ToLower() ?? "false"),
                            new XElement(ram + "UsedSupplyChainPackaging",
                                new XElement(ram + "Type", string.IsNullOrEmpty(packTypeStr) ? " " : packTypeStr)
                            ),
                            new XElement(ram + "IncludedPackagedTradeLineItem",
                                new XElement(ram + "SequenceNumeric", "1")
                            )
                        );
                        relatedCommercialTradeTransaction.Add(specifiedLogisticsPackage);
                    }
                }

                includedHouseConsignment.Add(relatedCommercialTradeTransaction);

                // --- 5. ApplicableTransportDangerousGoods ---
                var transportDg = jsonPayload["cargo:transportDangerousGoods"];
                if (transportDg != null)
                {
                    includedHouseConsignment.Add(new XElement(ram + "ApplicableTransportDangerousGoods",
                        new XElement(ram + "HazardTypeCode", (string)transportDg["cargo:hazardType"]),
                        new XElement(ram + "AircraftLimitationInformation"),
                        new XElement(ram + "ComplianceDeclarationInformation", (string)transportDg["cargo:complianceStatement"]),
                        new XElement(ram + "ShipperDeclarationInformation", (string)transportDg["cargo:shipperDeclarationText"])
                    ));
                }

                root.Add(new XElement(rsm + "MasterConsignment", includedHouseConsignment));

                var doc = new XDocument(new XDeclaration("1.0", "utf-8", null), root);
                var xmlString = doc.Declaration.ToString() + "\r\n" + doc.ToString();

                return Content(xmlString, "application/xml", System.Text.Encoding.UTF8);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Convertion Error", Details = ex.Message });
            }
        }


        /// <summary>
        /// XSDG XML TO ONE Record JSON LD
        /// </summary>
        [HttpPost("MappingXSDGtoJSONLD")]
        public IActionResult MappingXSDGtoJSON([FromForm] string xmlContent)
        {
            try
            {

                if (string.IsNullOrWhiteSpace(xmlContent))
                {
                    return BadRequest(new { Error = "XML(xmlContent) Missing or Invalid" });
                }


                var doc = XDocument.Parse(xmlContent);
                var root = doc.Root;


                XNamespace rsm = "iata:shippersdeclarationfordangerousgoods:1";
                XNamespace ram = "iata:datamodel:3";


                var shipment = new JObject
                {
                    ["@context"] = new JObject { ["cargo"] = "https://onerecord.iata.org/ns/cargo#" },
                    ["@type"] = "cargo:Shipment"
                };

                var msgHeader = root.Element(rsm + "MessageHeaderDocument");
                var bizHeader = root.Element(rsm + "BusinessHeaderDocument");
                var houseConsignment = root.Element(rsm + "MasterConsignment")?.Element(ram + "IncludedHouseConsignment");

                // --- 1. Dangerous Goods Declaration ---
                if (msgHeader != null)
                {
                    var dgDeclaration = new JObject
                    {
                        ["@type"] = "cargo:DangerousGoodsDeclaration",
                        ["cargo:documentName"] = (string)msgHeader.Element(ram + "Name"),
                        ["cargo:documentTypeCode"] = (string)msgHeader.Element(ram + "TypeCode"),
                        ["cargo:issueDate"] = (string)msgHeader.Element(ram + "IssueDateTime")
                    };

                    var statement = (string)bizHeader?.Element(ram + "SignatoryConsignorAuthentication")?.Element(ram + "Statement");
                    if (!string.IsNullOrEmpty(statement))
                    {
                        dgDeclaration["cargo:certification"] = new JObject
                        {
                            ["@type"] = "cargo:DGDeclarationCertification",
                            ["cargo:certificationText"] = statement
                        };
                    }
                    shipment["cargo:dangerousGoodsDeclaration"] = dgDeclaration;
                }

                // --- 2. Involved Parties (Shipper & Consignee) ---
                var involvedParties = new JArray();

                var consignor = houseConsignment?.Element(ram + "ConsignorParty");
                if (consignor != null)
                {
                    var name = (string)consignor.Element(ram + "Name");
                    if (!string.IsNullOrEmpty(name))
                    {
                        involvedParties.Add(new JObject
                        {
                            ["@type"] = "cargo:Party",
                            ["cargo:partyRole"] = new JObject { ["@type"] = "cargo:CodeListElement", ["cargo:code"] = "SHP" },
                            ["cargo:partyDetails"] = new JObject
                            {
                                ["@type"] = new JArray("cargo:Company"),
                                ["cargo:name"] = name
                            }
                        });
                    }
                }

                var consignee = houseConsignment?.Element(ram + "ConsigneeParty");
                if (consignee != null)
                {
                    var name = (string)consignee.Element(ram + "Name");
                    if (!string.IsNullOrEmpty(name))
                    {
                        involvedParties.Add(new JObject
                        {
                            ["@type"] = "cargo:Party",
                            ["cargo:partyRole"] = new JObject { ["@type"] = "cargo:CodeListElement", ["cargo:code"] = "CNE" },
                            ["cargo:partyDetails"] = new JObject
                            {
                                ["@type"] = new JArray("cargo:Company"),
                                ["cargo:name"] = name
                            }
                        });
                    }
                }

                if (involvedParties.Count > 0)
                {
                    shipment["cargo:involvedParties"] = involvedParties;
                }

                // --- 3. Handling Instructions ---
                var handlingInfo = houseConsignment?.Element(ram + "HandlingInstructions");
                if (handlingInfo != null)
                {
                    var desc = (string)handlingInfo.Element(ram + "Description");
                    if (!string.IsNullOrEmpty(desc))
                    {
                        var lines = desc.Split(new[] { "\\n" }, StringSplitOptions.None);
                        shipment["cargo:textualHandlingInstructions"] = new JArray(lines);
                    }
                }

                // --- 4. Associated Documents (Master AWB) ---
                var refDoc = houseConsignment?.Element(ram + "AssociatedReferenceDocument");
                if (refDoc != null)
                {
                    shipment["cargo:associatedDocuments"] = new JArray(new JObject
                    {
                        ["@type"] = "cargo:ExternalReference",
                        ["cargo:documentId"] = (string)refDoc.Element(ram + "ID"),
                        ["cargo:documentName"] = (string)refDoc.Element(ram + "Name"),
                        ["cargo:documentType"] = new JObject
                        {
                            ["@type"] = "cargo:CodeListElement",
                            ["cargo:code"] = (string)refDoc.Element(ram + "TypeCode")
                        }
                    });
                }

                // --- 5. Products & Packaging ---
                var tradeTransactions = houseConsignment?.Elements(ram + "RelatedCommercialTradeTransaction");
                var products = new JArray();
                var packages = new JArray();

                if (tradeTransactions != null)
                {
                    foreach (var tx in tradeTransactions)
                    {
                        // Product mapping
                        var lineItem = tx.Element(ram + "IncludedCommercialTradeLineItem");
                        if (lineItem != null)
                        {
                            var appProduct = lineItem.Element(ram + "SpecifiedProductTradeDelivery")?
                                .Element(ram + "SpecifiedProductRegulatedGoods")?
                                .Element(ram + "ApplicableProductDangerousGoods");

                            if (appProduct != null)
                            {
                                products.Add(new JObject
                                {
                                    ["@type"] = "cargo:Product",
                                    ["cargo:sequenceNumber"] = (int?)lineItem.Element(ram + "SequenceNumeric") ?? 1,
                                    ["cargo:unNumber"] = (string)appProduct.Element(ram + "UNDGIdentificationCode"),
                                    ["cargo:hazardClass"] = (string)appProduct.Element(ram + "HazardClassificationID"),
                                    ["cargo:hazardCategory"] = (string)appProduct.Element(ram + "HazardCategoryCode"),
                                    ["cargo:properShippingName"] = (string)appProduct.Element(ram + "ProperShippingName"),
                                    ["cargo:packingGroup"] = (string)appProduct.Element(ram + "PackagingDangerLevelCode"),
                                    ["cargo:packingInstruction"] = (string)appProduct.Element(ram + "PackingInstructionTypeCode")
                                });
                            }
                        }

                        // Packaging mapping
                        var packageInfo = tx.Element(ram + "SpecifiedLogisticsPackage");
                        if (packageInfo != null)
                        {
                            packages.Add(new JObject
                            {
                                ["@type"] = "cargo:Packaging",
                                ["cargo:packageSequence"] = (int?)packageInfo.Element(ram + "SequenceNumeric") ?? 1,
                                ["cargo:packageCount"] = (int?)packageInfo.Element(ram + "ItemQuantity") ?? 0,
                                ["cargo:allPackedInOneIndicator"] = ((string)packageInfo.Element(ram + "AllPackedInOneIndicator"))?.ToLower() == "true",
                                ["cargo:packagingTypeDescription"] = (string)packageInfo.Element(ram + "UsedSupplyChainPackaging")?.Element(ram + "Type")?.Value?.Trim()
                            });
                        }
                    }
                }

                if (products.Count > 0) shipment["cargo:dangerousGoodsProducts"] = products;
                if (packages.Count > 0) shipment["cargo:packaging"] = packages;

                // --- 6. Transport Dangerous Goods ---
                var transportDg = houseConsignment?.Element(ram + "ApplicableTransportDangerousGoods");
                if (transportDg != null)
                {
                    shipment["cargo:transportDangerousGoods"] = new JObject
                    {
                        ["@type"] = "cargo:TransportDangerousGoods",
                        ["cargo:hazardType"] = (string)transportDg.Element(ram + "HazardTypeCode"),
                        ["cargo:complianceStatement"] = (string)transportDg.Element(ram + "ComplianceDeclarationInformation"),
                        ["cargo:shipperDeclarationText"] = (string)transportDg.Element(ram + "ShipperDeclarationInformation")
                    };
                }

                return Ok(shipment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "XML Parse Error", Details = ex.Message });
            }
        }
    }
}